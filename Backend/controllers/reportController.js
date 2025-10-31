import MedicalReport from "../models/medicalReports.models.js";
import { generateResponse } from "../utils/shivaayAPI.js";
import {
  uploadToCloudinary,
  generateDownloadUrl,
} from "../config/cloudinary.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

/**
 * Helper function to ensure filename has .pdf extension without duplication
 */
const ensurePdfExtension = (filename) => {
  if (!filename) return "report.pdf";

  // Check if filename already ends with .pdf (case insensitive)
  if (filename.toLowerCase().endsWith(".pdf")) {
    return filename;
  }

  return `${filename}.pdf`;
};

/**
 * Helper function to get download URL for Cloudinary raw files (PDFs)
 * Uses Cloudinary's attachment flag to ensure proper filename on download
 */
const getDownloadUrl = (cloudinaryUrl, publicId, filename) => {
  if (!cloudinaryUrl || !publicId) return cloudinaryUrl;

  // Ensure the filename has .pdf extension without duplication
  const properFilename = ensurePdfExtension(filename);

  // Use the generateDownloadUrl function to create a proper download link
  // with Content-Disposition: attachment header
  const downloadUrl = generateDownloadUrl(publicId, properFilename);

  console.log("🔗 Download URL generated for:", properFilename);
  return downloadUrl;
};
/**
 * Helper function to clean markdown formatting from text
 * Removes # (headers) and * (bold/italic) markers while preserving spacing and paragraphs
 */
const cleanMarkdown = (text) => {
  if (!text) return text;

  return (
    text
      // Remove header markers (# ## ### etc.) but keep the text on new line
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold markers (**text** or __text__)
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      // Remove italic markers (*text* or _text_)
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      // Remove inline code markers (`text`)
      .replace(/`(.+?)`/g, "$1")
      // Remove horizontal rules (--- or ***)
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Clean up any remaining standalone * or #
      .replace(/[\*#]/g, "")
      // Normalize line breaks - replace multiple newlines with double newline (paragraph)
      .replace(/\n{3,}/g, "\n\n")
      // Clean up spaces at the end of lines
      .replace(/[ \t]+$/gm, "")
      // Clean up multiple spaces on the same line (but preserve single spaces)
      .replace(/[ \t]{2,}/g, " ")
      // Trim whitespace from start and end
      .trim()
  );
};

/**
 * @desc    Upload a new medical report, parse it, summarize, and save
 * @route   POST /api/reports/upload
 * @access  Private (requires Clerk authentication)
 * @body    FormData: { "reportName": "...", "report": FILE }
 */
export const uploadReport = async (req, res) => {
  try {
    // Get userId from Clerk middleware (req.userId is set by requireAuth)
    const userId = req.userId;
    const { reportName } = req.body;
    const file = req.file;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!file) {
      return res.status(400).json({ error: "Report file is required" });
    }

    // --- 1. Parse PDF Text ---
    let fileText = "";
    try {
      // Convert Buffer to Uint8Array
      const uint8Array = new Uint8Array(file.buffer);

      // Load the PDF document with proper configuration
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        // Disable font warnings by providing standard font data URL
        standardFontDataUrl:
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/",
        // Suppress worker-related warnings
        verbosity: 0, // 0 = errors only, 1 = warnings, 5 = all
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
      // Use reportName from request body, or fallback to original filename
      const filename = reportName || file.originalname;

      console.log("📤 Preparing to upload PDF:");
      console.log("   - Filename:", filename);
      console.log("   - Buffer size:", file.buffer?.length || 0, "bytes");
      console.log("   - Original name:", file.originalname);
      console.log("   - MIME type:", file.mimetype);

      uploadResult = await uploadToCloudinary(
        file.buffer,
        "medical_reports",
        filename
      );
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
      const rawSummary = await generateResponse(summaryPrompt);
      // Clean markdown formatting from the AI response
      summary = cleanMarkdown(rawSummary);
    } catch (aiError) {
      console.error("AI Summary Error:", aiError);
      summary = "AI summary failed. Please review the document manually.";
    }

    // --- 4. Save to MongoDB ---
    const newReport = new MedicalReport({
      userId: userId,
      reportName: reportName || file.originalname,
      reportUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id, // Save the Cloudinary public_id
      summary: summary,
    });

    await newReport.save();

    // Use backend download endpoint instead of direct Cloudinary URL
    const fileUrl = `/api/reports/download/${newReport._id}`;

    res.status(201).json({
      message: "Report uploaded and summarized successfully!",
      report: {
        id: newReport._id,
        fileName: newReport.reportName,
        reportName: newReport.reportName,
        reportUrl: newReport.reportUrl,
        fileUrl: fileUrl, // Backend proxy download URL
        summary: newReport.summary,
        uploadDate: newReport.createdAt,
        createdAt: newReport.createdAt,
        updatedAt: newReport.updatedAt,
      },
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

/**
 * @desc    Get all medical reports for the authenticated user
 * @route   GET /api/reports
 * @access  Private (requires Clerk authentication)
 */
export const getReports = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const reports = await MedicalReport.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    // Format the response to match frontend expectations
    const formattedReports = reports.map((report) => {
      // Use backend download endpoint instead of direct Cloudinary URL
      const fileUrl = `/api/reports/download/${report._id}`;

      return {
        id: report._id,
        fileName: report.reportName,
        reportName: report.reportName,
        reportUrl: report.reportUrl,
        fileUrl: fileUrl, // Backend proxy download URL
        summary: report.summary,
        uploadDate: report.createdAt,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      };
    });

    res.status(200).json(formattedReports);
  } catch (err) {
    console.error("❌ getReports error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Delete a medical report
 * @route   DELETE /api/reports/:reportId
 * @access  Private (requires Clerk authentication)
 */
export const deleteReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { reportId } = req.params;

    if (!userId || !reportId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find and verify ownership
    const report = await MedicalReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (report.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized access to report" });
    }

    // Delete the report
    await MedicalReport.findByIdAndDelete(reportId);

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error("❌ deleteReport error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Explain a medical report in simple language
 * @route   POST /api/reports/explain
 * @access  Private (requires Clerk authentication)
 * @body    { reportId: string, language: string }
 */
export const explainReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { reportId, language = "en" } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!reportId) {
      return res.status(400).json({ error: "Report ID is required" });
    }

    // Find and verify ownership
    const report = await MedicalReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (report.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized access to report" });
    }

    // Check if report has a summary (the extracted text)
    if (!report.summary || report.summary.length < 10) {
      return res.status(400).json({
        error: "Report does not have enough content to explain",
      });
    }

    // Generate explanation in the requested language
    const languageInstruction =
      language === "hi"
        ? "Explain in Hindi (Hinglish is acceptable):"
        : "Explain in English:";

    const explanationPrompt = `${languageInstruction}

You are a friendly doctor explaining a medical report to a patient who has no medical background. Use simple, everyday language that anyone can understand. Avoid medical jargon, and when you must use medical terms, immediately explain them in simple words.

Medical Report Summary:
${report.summary}

Please explain this report in a warm, reassuring way. Include:
1. What the tests/findings mean in simple language
2. Which results are normal and which need attention
3. What the patient should do next (like talking to their doctor)
4. Reassurance where appropriate

Keep the explanation conversational and easy to understand, as if talking to a friend.`;

    let explanation = "";
    try {
      const rawExplanation = await generateResponse(explanationPrompt);
      // Clean markdown formatting from the AI response
      explanation = cleanMarkdown(rawExplanation);
    } catch (aiError) {
      console.error("AI Explanation Error:", aiError);
      return res.status(500).json({
        error: "Failed to generate explanation. Please try again.",
      });
    }

    res.status(200).json({
      message: "Explanation generated successfully",
      explanation: explanation,
      language: language,
    });
  } catch (err) {
    console.error("❌ explainReport error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc    Download a report with proper Content-Disposition headers
 * @route   GET /api/reports/download/:reportId
 * @access  Private (requires Clerk authentication)
 */
export const downloadReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { reportId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!reportId) {
      return res.status(400).json({ error: "Report ID is required" });
    }

    // Find the report and verify ownership
    const report = await MedicalReport.findOne({ _id: reportId, userId });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Fetch the file from Cloudinary using native fetch (Node 18+)
    const response = await fetch(report.reportUrl);

    if (!response.ok) {
      console.error("Failed to fetch from Cloudinary:", response.statusText);
      return res.status(500).json({ error: "Failed to download file" });
    }

    // Get the file buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure proper filename with .pdf extension
    const filename = ensurePdfExtension(report.reportName);

    console.log(`📥 Download request for report: ${report.reportName}`);
    console.log(`📝 Final filename: ${filename}`);

    // Set headers to force download with proper filename
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", buffer.length);

    // Send the file
    res.send(buffer);

    console.log(`✅ Downloaded report: ${filename}`);
  } catch (err) {
    console.error("❌ downloadReport error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
