import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    //   userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'User ID is required'],
    //     index: true
    //   }
    userId: {
      // Changed for testing: Allows any data type (string, number, etc.)
      type: mongoose.Schema.Types.Mixed,
      // Removed 'ref' as it's only for ObjectId references
      // ref: 'User',
      required: [true, "User ID is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
conversationSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Conversation', conversationSchema);