import MedicalReport from "../models/medicalReports.models.js";
import { generateResponse } from "../utils/shivaayAPI.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

/**
 * @desc    Upload a new medical report, parse it, summarize, and save
 * @route   POST /api/reports/upload
 * @access  Private (add auth middleware later)
 * @body    FormData: { "userId": "...", "reportName": "...", "report": FILE }
 */
export const uploadReport = async (req, res) => {
  try {
    const { userId, reportName } = req.body;
    const file = req.file;

    if (!userId || !file) {
      return res
        .status(400)
        .json({ error: "userId and report file are required" });
    }

    // --- 1. Parse PDF Text ---
    let fileText = "";
    try {
      // Convert Buffer to Uint8Array
      const uint8Array = new Uint8Array(file.buffer);

      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array, // ✅ Use Uint8Array instead of Buffer
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      console.log(`📄 PDF loaded: ${numPages} pages`);

      // Extract text from all pages
      const textPromises = [];
      for (let i = 1; i <= numPages; i++) {
        textPromises.push(
          pdf
            .getPage(i)
            .then((page) =>
              page
                .getTextContent()
                .then((textContent) =>
                  textContent.items.map((item) => item.str).join(" ")
                )
            )
        );
      }

      const pageTexts = await Promise.all(textPromises);
      fileText = pageTexts.join("\n\n");

      console.log(`✅ Extracted ${fileText.length} characters from PDF`);
    } catch (parseError) {
      console.error("PDF Parse Error:", parseError);
      return res.status(400).json({ error: "Failed to parse PDF file." });
    }

    if (fileText.length < 20) {
      return res
        .status(400)
        .json({ error: "PDF seems to be empty or unreadable." });
    }

    // --- 2. Upload Original PDF to Cloudinary ---
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(file.buffer, "medical_reports");
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);
      return res.status(500).json({ error: "Failed to upload file." });
    }

    // --- 3. Generate Summary with Shivaay ---
    const summaryPrompt = `Summarize the following medical report text into key findings. Be concise and list the main results.Explain everything in simple language which can be understood by normal person Text: ${fileText.substring(
      0,
      4000
    )}`;

    let summary = "";
    try {
      summary = await generateResponse(summaryPrompt);
    } catch (aiError) {
      console.error("AI Summary Error:", aiError);
      summary = "AI summary failed. Please review the document manually.";
    }

    // --- 4. Save to MongoDB ---
    const newReport = new MedicalReport({
      userId: userId,
      reportName: reportName || file.originalname,
      reportUrl: uploadResult.secure_url,
      summary: summary,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report uploaded and summarized successfully!",
      report: newReport,
    });
  } catch (err) {
    console.error("❌ uploadReport error:", err);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File is too large (Max 10MB)." });
    }
    if (err.message.includes("File type not supported")) {
      return res
        .status(400)
        .json({ error: "File type not supported. Only PDF is allowed." });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
