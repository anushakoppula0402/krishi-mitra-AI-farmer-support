import mongoose, { Schema, Document } from 'mongoose';
import { Message as IMessage, MessageRole } from '../types/index.js';

export interface MessageDocument extends Omit<IMessage, '_id'>, Document {}

const messageSchema = new Schema<MessageDocument>({
  conversationId: {
    type: String,
    required: [true, 'Conversation ID is required'],
    index: true
  },
  role: {
    type: String,
    enum: Object.values(MessageRole),
    required: [true, 'Message role is required']
  },
  text: {
    type: String,
    required: [true, 'Message text is required'],
    maxlength: [10000, 'Message text cannot exceed 10000 characters']
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v) || /^\/uploads\/.+/.test(v);
      },
      message: 'Invalid image URL format'
    }
  },
  feedback: {
    type: String,
    enum: ['up', 'down'],
    sparse: true
  },
  metadata: {
    responseTime: {
      type: Number,
      min: [0, 'Response time cannot be negative']
    },
    model: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

// Indexes for performance
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ role: 1 });
// messageSchema.index({ feedback: 1 }); // Removed - already defined in field

export const Message = mongoose.model<MessageDocument>('Message', messageSchema);