import mongoose, { Schema, Document } from 'mongoose';
import { WeatherAlert as IWeatherAlert, MultilingualString } from '../types/index.js';

export interface WeatherAlertDocument extends Omit<IWeatherAlert, '_id'>, Document {}

const multilingualStringSchema = new Schema<MultilingualString>({
  en: { type: String, required: true },
  hi: { type: String, required: true },
  ml: { type: String, required: true },
  te: { type: String, required: true }
}, { _id: false });

const weatherAlertSchema = new Schema<WeatherAlertDocument>({
  type: {
    type: String,
    enum: ['heavyRain', 'drought', 'frost', 'storm', 'hail'],
    required: [true, 'Alert type is required']
  },
  message: {
    type: multilingualStringSchema,
    required: [true, 'Alert message is required']
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: [true, 'Alert severity is required']
  },
  regions: [{
    type: String,
    required: true,
    trim: true
  }],
  validFrom: {
    type: Date,
    required: [true, 'Valid from date is required']
  },
  validUntil: {
    type: Date,
    required: [true, 'Valid until date is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for performance
weatherAlertSchema.index({ type: 1, isActive: 1 });
weatherAlertSchema.index({ regions: 1, validFrom: -1 });
weatherAlertSchema.index({ validFrom: 1, validUntil: 1 });
weatherAlertSchema.index({ severity: 1 });

export const WeatherAlert = mongoose.model<WeatherAlertDocument>('WeatherAlert', weatherAlertSchema);