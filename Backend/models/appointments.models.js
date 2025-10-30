import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // CORRECTED: Changed 'patientId' to 'userId'
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    // ADDED: From your frontend form
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    // ADDED: From your frontend form
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },

    // ADDED: From your frontend form
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    // ADDED: From your frontend form
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      index: true,
    },

    // CORRECTED: Changed 'doctorId' to a simple string
    preferredDoctor: {
      type: String,
      trim: true,
      default: "Any",
    },

    datetime: {
      type: Date,
      required: [true, "Appointment datetime is required"],
      validate: {
        validator: function (value) {
          // Allows booking for today, but not in the past
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Appointment datetime cannot be in the past",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["SCHEDULED", "CANCELLED", "COMPLETED"],
        message: "{VALUE} is not a valid status",
      },
      default: "SCHEDULED",
    },

    // CORRECTED: Renamed 'notes' to match your form
    additionalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for efficient queries
appointmentSchema.index({ userId: 1, datetime: 1 });
appointmentSchema.index({ department: 1, datetime: 1 });
appointmentSchema.index({ datetime: 1, status: 1 });

export default mongoose.model("Appointment", appointmentSchema);
