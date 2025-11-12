import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User as IUser } from '../types/index.js';

export interface UserDocument extends Omit<IUser, '_id'>, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const languageSchema = new Schema({
  code: {
    type: String,
    enum: ['en', 'hi', 'ml', 'te'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bcp47: {
    type: String,
    required: true
  }
}, { _id: false });

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  profile: {
    farmLocation: {
      type: String,
      trim: true
    },
    farmSize: {
      type: Number,
      min: [0, 'Farm size cannot be negative']
    },
    primaryCrops: [{
      type: String,
      trim: true
    }],
    contactNumber: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-()]+$/, 'Please enter a valid contact number']
    }
  },
  preferences: {
    language: {
      type: languageSchema,
      default: {
        code: 'en',
        name: 'English',
        bcp47: 'en-US'
      }
    },
    notifications: {
      weather: {
        type: Boolean,
        default: true
      },
      market: {
        type: Boolean,
        default: true
      },
      schemes: {
        type: Boolean,
        default: true
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      const { password, ...userWithoutPassword } = ret;
      return userWithoutPassword;
    }
  }
});

// Index for performance
// userSchema.index({ username: 1 }); // Removed - already defined in field
// userSchema.index({ email: 1 }); // Removed - already defined in field
userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<UserDocument>('User', userSchema);