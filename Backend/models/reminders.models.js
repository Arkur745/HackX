import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.Mixed,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    message: {
      type: String,
      required: [true, "Reminder message is required"],
      trim: true,
    },
    scheduleTime: {
      type: Date,
      required: [true, "Schedule time is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "DONE"],
        message: "{VALUE} is not a valid status",
      },
      default: "PENDING",
    },
    // Removed manual 'createdAt'
  },
  {
    timestamps: true, // Set to true for consistency (adds createdAt and updatedAt)
  }
);

// Compound index for efficient reminder queries
reminderSchema.index({ userId: 1, scheduleTime: 1, status: 1 });

export default mongoose.model("Reminder", reminderSchema);
