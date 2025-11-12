import mongoose, { Schema, Document } from 'mongoose';
import { Conversation as IConversation } from '../types/index.js';

export interface ConversationDocument extends Omit<IConversation, '_id'>, Document {}

const conversationSchema = new Schema<ConversationDocument>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Conversation title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  startTime: {
    type: Date,
    required: [true, 'Start time is required'],
    default: Date.now
  },
  lastUpdateTime: {
    type: Date,
    required: [true, 'Last update time is required'],
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    totalMessages: {
      type: Number,
      default: 0,
      min: [0, 'Total messages cannot be negative']
    },
    avgResponseTime: {
      type: Number,
      min: [0, 'Average response time cannot be negative']
    }
  }
}, {
  timestamps: true
});

// Indexes for performance
conversationSchema.index({ userId: 1, lastUpdateTime: -1 });
conversationSchema.index({ isActive: 1 });
conversationSchema.index({ startTime: -1 });

// Update lastUpdateTime before saving
conversationSchema.pre('save', function(next) {
  this.lastUpdateTime = new Date();
  next();
});

export const Conversation = mongoose.model<ConversationDocument>('Conversation', conversationSchema);