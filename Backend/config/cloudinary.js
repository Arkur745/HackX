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
 * @returns {Promise<object>} The Cloudinary upload result
 */
export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    // We use upload_stream to upload from a buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Automatically detect file type (pdf, image, etc.)
        folder: folder,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary stream upload error:", error);
          return reject(new Error("Cloudinary stream upload failed"));
        }
        resolve(result);
      }
    );

    // Use streamifier to create a read stream from the buffer and pipe it
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export default setupCloudinary;
