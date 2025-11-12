import mongoose, { Schema, Document } from 'mongoose';
import { MarketPrice as IMarketPrice } from '../types/index.js';

export interface MarketPriceDocument extends Omit<IMarketPrice, '_id'>, Document {}

const marketPriceSchema = new Schema<MarketPriceDocument>({
  cropName: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true,
    index: true
  },
  variety: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true,
    enum: ['quintal', 'kg', 'ton', 'bag']
  },
  market: {
    type: String,
    required: [true, 'Market name is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    index: true
  },
  district: {
    type: String,
    trim: true
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
    required: [true, 'Price trend is required']
  },
  priceDate: {
    type: Date,
    required: [true, 'Price date is required'],
    index: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for performance
marketPriceSchema.index({ cropName: 1, state: 1, priceDate: -1 });
marketPriceSchema.index({ priceDate: -1 });
marketPriceSchema.index({ isVerified: 1 });

export const MarketPrice = mongoose.model<MarketPriceDocument>('MarketPrice', marketPriceSchema);