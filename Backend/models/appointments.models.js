import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient ID is required'],
    index: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor ID is required'],
    index: true
  },
  datetime: {
    type: Date,
    required: [true, 'Appointment datetime is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Appointment datetime must be in the future'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['SCHEDULED', 'CANCELLED', 'COMPLETED'],
      message: '{VALUE} is not a valid status'
    },
    default: 'SCHEDULED'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
appointmentSchema.index({ patientId: 1, datetime: 1 });
appointmentSchema.index({ doctorId: 1, datetime: 1 });
appointmentSchema.index({ datetime: 1, status: 1 });

export default mongoose.model('Appointment', appointmentSchema);
