import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
conversationSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Conversation', conversationSchema);