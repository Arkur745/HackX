import mongoose from "mongoose";

const medicalReportSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Changed to String for Clerk user IDs
      required: [true, "User ID is required"],
      index: true,
    },
    reportName: {
      type: String,
      required: [true, "Report name is required"],
      trim: true,
    },
    reportUrl: {
      type: String,
      required: [true, "Report URL is required"],
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
      // Cloudinary public_id for generating proper download URLs
    },
    summary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient user report retrieval
medicalReportSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("MedicalReport", medicalReportSchema);
