import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: [true, 'Conversation ID is required'],
    index: true
  },
  sender: {
    type: String,
    enum: {
      values: ['USER', 'ASSISTANT'],
      message: '{VALUE} is not a valid sender type'
    },
    required: [true, 'Sender is required']
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true
  },
  type: {
    type: String,
    enum: {
      values: ['TEXT', 'VOICE'],
      message: '{VALUE} is not a valid message type'
    },
    required: [true, 'Message type is required'],
    default: 'TEXT'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Compound index for efficient conversation message retrieval
messageSchema.index({ conversationId: 1, createdAt: 1 });

export default mongoose.model('Message', messageSchema);
