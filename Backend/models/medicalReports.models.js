import mongoose from 'mongoose';

const medicalReportSchema = new mongoose.Schema(
  {
    userId: {
      // type: mongoose.Schema.Types.ObjectId, // <-- Original
      // ref: 'User', // <-- Original

      type: mongoose.Schema.Types.Mixed, // <-- CHANGED for testing
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

export default mongoose.model('MedicalReport', medicalReportSchema);
