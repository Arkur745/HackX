import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
} from "./env.js"; // Make sure your env config exports these

/**
 * @desc Configures the Cloudinary SDK
 */
const setupCloudinary = () => {
  try {
    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET
    ) {
      console.warn(
        "⚠️  Cloudinary env variables missing. File upload will fail."
      );
      return;
    }
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log("☁️  Cloudinary configured");
  } catch (error) {
    console.error("❌ Cloudinary config error:", error);
  }
};

/**
 * @desc Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer The file buffer to upload
 * @param {string} folder The folder in Cloudinary to upload to
 * @param {string} originalFilename Optional original filename for better naming
 * @returns {Promise<object>} The Cloudinary upload result
 */
export const uploadToCloudinary = (
  fileBuffer,
  folder,
  originalFilename = null
) => {
  return new Promise((resolve, reject) => {
    // Validate file buffer
    if (!fileBuffer || fileBuffer.length === 0) {
      console.error("❌ File buffer is empty or null");
      return reject(new Error("Empty file buffer"));
    }

    console.log("📦 Buffer size:", fileBuffer.length, "bytes");

    // Create a clean public_id from filename, WITHOUT .pdf extension
    // Cloudinary handles the extension automatically with resource_type: "raw"
    let publicId = `report_${Date.now()}`; // Default public_id without extension
    if (originalFilename) {
      // Clean the filename and REMOVE .pdf extension for the public_id
      const cleanName = originalFilename
        .replace(/\.pdf$/i, "") // Remove .pdf extension from the end
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 50); // Limit length
      publicId = `${cleanName}_${Date.now()}`; // No .pdf extension here
    }

    console.log("📝 Correct Public ID (without extension):", publicId);

    // We use upload_stream to upload from a buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // Use "raw" for PDFs - Cloudinary infers format automatically
        folder: folder,
        public_id: publicId, // Use the cleaned public_id without extension
        // Do NOT set format - it causes Cloudinary to append .pdf to public_id
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary stream upload error:", error);
          return reject(new Error("Cloudinary stream upload failed"));
        }
        console.log("✅ Cloudinary upload successful:", result.secure_url);
        console.log("📋 Public ID:", result.public_id);
        console.log("📋 Resource type:", result.resource_type);
        console.log("📏 File size:", result.bytes, "bytes");
        resolve(result);
      }
    );

    // Use streamifier to create a read stream from the buffer and pipe it
    // This is the correct way to upload a buffer to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

/**
 * @desc Generate a download URL with proper Content-Disposition header
 * This ensures the file downloads with the correct filename and extension
 * @param {string} publicId The public_id of the resource (e.g., "medical_reports/LabReport_123")
 * @param {string} filename The desired filename for download (e.g., "Lab Report.pdf")
 * @returns {string} The signed download URL
 */
export const generateDownloadUrl = (publicId, filename = "report.pdf") => {
  if (!publicId) return null;

  try {
    // For raw resources with proper filename in download, we need fl_attachment with the filename
    // Format: /raw/upload/fl_attachment:filename/version/public_id

    // Get the base URL without transformations
    const baseUrl = cloudinary.url(publicId, {
      resource_type: "raw",
      type: "upload",
      secure: true,
    });

    // Insert the fl_attachment:filename transformation into the URL
    // We need to URL-encode the filename but keep the colon
    const encodedFilename = encodeURIComponent(filename);
    const urlParts = baseUrl.split("/upload/");

    if (urlParts.length === 2) {
      // Insert fl_attachment:filename between /upload/ and the rest
      const downloadUrl = `${urlParts[0]}/upload/fl_attachment:${encodedFilename}/${urlParts[1]}`;
      console.log(`🔗 Generated download URL for ${filename}:`, downloadUrl);
      return downloadUrl;
    }

    // Fallback to basic URL if we can't parse it
    console.log(`⚠️ Could not parse URL for ${filename}, using direct URL`);
    return baseUrl;
  } catch (error) {
    console.error("❌ Error generating download URL:", error);
    // Fallback to the basic URL if generation fails
    return cloudinary.url(publicId, {
      resource_type: "raw",
      secure: true,
    });
  }
};

export default setupCloudinary;
