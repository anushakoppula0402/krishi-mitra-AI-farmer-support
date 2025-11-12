import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// Load environment variables first
config();

// Rate limiting for AI requests
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 AI requests per hour
  message: {
    error: 'Too many AI requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Initialize Google Generative AI
let genAI: GoogleGenerativeAI | null = null;

const initializeGenAI = () => {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.warn('Google AI API key not found. AI features will be disabled.');
    return null;
  }
  
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Google Generative AI initialized successfully');
    return genAI;
  } catch (error) {
    console.error('❌ Failed to initialize Google Generative AI:', error);
    return null;
  }
};

// Initialize on module load
initializeGenAI();

interface GenerateResponseOptions {
  prompt: string;
  language: {
    code: 'en' | 'hi' | 'ml' | 'te';
    name: string;
    bcp47: string;
  };
  imageData?: {
    mimeType: string;
    data: string; // base64 encoded
  };
  model?: string;
  temperature?: number;
}

export const generateResponse = async (options: GenerateResponseOptions): Promise<string> => {
  if (!genAI) {
    throw new Error('Google Generative AI is not initialized. Please check your API key.');
  }

  const {
    prompt,
    language,
    imageData,
    model = 'gemini-1.5-flash',
    temperature = 0.7
  } = options;

  const systemInstruction = `You are 'Krishi Mitra', an expert AI agricultural advisor for Indian farmers. Your goal is to provide concise, helpful, practical, and trustworthy advice. Respond ONLY in ${language.name}. Do not use any other language. Address the user directly and empathetically.

When generating your response, you must act as if your knowledge is grounded in the following authoritative and localized data sources:

1. **Authoritative Advisories**: Information from State Agricultural Department advisories, Krishi Vigyan Kendra (KVK) bulletins, and ICAR publications.
2. **Weather & Climate**: Real-time local weather data from IMD and local station APIs, including short-term forecasts and seasonal patterns.
3. **Soil Health**: Knowledge of local soil types from soil maps and best practices for soil testing.
4. **Pest & Disease Management**: A comprehensive database of approved pesticides, correct dosages, pre-harvest intervals, and safety protocols.
5. **Crop Calendars**: Localized crop cycles and schedules based on specific agro-climatic zones in India.
6. **Market Information**: Awareness of local mandi prices for various crops.
7. **Expert Agronomy**: Curated knowledge from expert agronomists, including FAQs and step-by-step action guides.

**User Data & Privacy**:
- You must respect user privacy. Base your advice on the information provided in the current query (text and images).
- Do not ask for personally identifiable information.
- All advice should be general but tailored to the query. Acknowledge that you are an AI and cannot replace a local expert.

**Important Guidelines**:
- When advising on seeds, fertilizers, or pesticides, recommend using products from well-known, reputable brands and advise the user to check for quality certifications. Do not name specific brands, but emphasize the importance of quality.
- Always provide practical, actionable advice.
- Include safety precautions when relevant.
- Suggest consulting local agricultural experts when appropriate.

Your expertise covers crop diseases, pest control, soil health, irrigation, market prices, weather advisories, and government schemes for farmers in India.`;

  try {
    const genModel = genAI.getGenerativeModel({ 
      model
    });

    const parts: any[] = [];

    // Add system instruction as first message
    parts.unshift({ text: systemInstruction });

    // Add image if provided
    if (imageData) {
      parts.push({
        inlineData: {
          mimeType: imageData.mimeType,
          data: imageData.data,
        },
      });
    }

    // Add text prompt
    const effectivePrompt = prompt || "Please analyze the image and provide agricultural advice.";
    parts.push({ text: effectivePrompt });

    const result = await genModel.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        temperature,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    });

    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Received empty response from AI model');
    }

    return text.trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('quota') || error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('AI service quota exceeded. Please try again later.');
      }
      if (error.message.includes('safety') || error.message.includes('SAFETY')) {
        throw new Error('Content blocked for safety reasons. Please rephrase your question.');
      }
      if (error.message.includes('invalid') || error.message.includes('INVALID_ARGUMENT')) {
        throw new Error('Invalid request format. Please check your input.');
      }
      if (error.message.includes('API key') || error.message.includes('API_KEY')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
    }
    
    throw new Error('Failed to generate AI response. Please try again.');
  }
};

// Middleware to check if AI service is available
export const checkAIAvailability = (req: Request, res: Response, next: NextFunction) => {
  if (!genAI) {
    res.status(503).json({
      success: false,
      error: 'AI service is currently unavailable. Please try again later.'
    });
    return;
  }
  next();
};

// Helper function to detect image MIME type from base64 data
export const detectImageMimeType = (base64String: string): string | null => {
  const signatures = {
    'iVBORw0KGgo': 'image/png',
    '/9j/': 'image/jpeg',
    'UklGR': 'image/webp',
    'R0lGOD': 'image/gif'
  };

  for (const [signature, mimeType] of Object.entries(signatures)) {
    if (base64String.startsWith(signature)) {
      return mimeType;
    }
  }

  return null;
};

// Helper function to validate and process image data
export const processImageData = (imageBase64: string): { mimeType: string; data: string } => {
  if (!imageBase64) {
    throw new Error('Image data is required');
  }

  // Remove data URL prefix if present
  const base64Data = imageBase64.includes(',') 
    ? imageBase64.split(',')[1] 
    : imageBase64;

  // Detect MIME type
  const mimeType = detectImageMimeType(base64Data);
  if (!mimeType) {
    throw new Error('Unsupported image format. Please use PNG, JPEG, WebP, or GIF.');
  }

  // Validate base64 data
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length === 0) {
      throw new Error('Invalid image data');
    }

    // Check file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (buffer.length > maxSize) {
      throw new Error('Image file too large. Maximum size is 10MB.');
    }
  } catch (error) {
    throw new Error('Invalid base64 image data');
  }

  return {
    mimeType,
    data: base64Data
  };
};