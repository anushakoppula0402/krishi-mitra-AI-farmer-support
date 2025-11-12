import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const getMimeType = (base64String: string): string | null => {
    const signature = base64String.substring(0, 30);
    if (signature.includes("data:image/jpeg")) return "image/jpeg";
    if (signature.includes("data:image/png")) return "image/png";
    if (signature.includes("data:image/webp")) return "image/webp";
    return "image/jpeg"; // default
}

export const generateResponse = async (
  prompt: string,
  language: Language,
  imageBase64?: string
): Promise<string> => {
  
  const systemInstruction = `You are 'Krishi Mitra', an expert AI agricultural advisor for Indian farmers. Your goal is to provide concise, helpful, practical, and trustworthy advice. Respond ONLY in ${language.name}. Do not use any other language. Address the user directly and empathetically.
  
When generating your response, you must act as if your knowledge is grounded in the following authoritative and localized data sources:

1.  **Authoritative Advisories**: Information from State Agricultural Department advisories, Krishi Vigyan Kendra (KVK) bulletins, and ICAR publications.
2.  **Weather & Climate**: Real-time local weather data from IMD and local station APIs, including short-term forecasts and seasonal patterns.
3.  **Soil Health**: Knowledge of local soil types from soil maps and best practices for soil testing.
4.  **Pest & Disease Management**: A comprehensive database of approved pesticides, correct dosages, pre-harvest intervals, and safety protocols.
5.  **Crop Calendars**: Localized crop cycles and schedules based on specific agro-climatic zones in India.
6.  **Market Information**: Awareness of local mandi prices for various crops.
7.  **Expert Agronomy**: Curated knowledge from expert agronomists, including FAQs and step-by-step action guides.

**User Data & Privacy**:
- You must respect user privacy. Base your advice on the information provided in the current query (text and images).
- Do not ask for personally identifiable information.
- All advice should be general but tailored to the query. Acknowledge that you are an AI and cannot replace a local expert.

**Important Guidelines**:
- When advising on seeds, fertilizers, or pesticides, recommend using products from well-known, reputable brands and advise the user to check for quality certifications. Do not name specific brands, but emphasize the importance of quality.

Your expertise covers crop diseases, pest control, soil health, irrigation, market prices, weather advisories, and government schemes for farmers in India.`;

  const parts: any[] = [];
  
  if (imageBase64) {
    const mimeType = getMimeType(imageBase64);
    if (!mimeType) throw new Error("Unsupported file format");
    
    const pureBase64 = imageBase64.split(',')[1];
    parts.push({
      inlineData: {
        mimeType,
        data: pureBase64,
      },
    });
    
    // Add specific instructions based on file type
    if (mimeType.startsWith("image/")) {
      parts.push({ text: "Analyze this image and provide relevant agricultural advice. If it's a crop, identify any issues such as pests, diseases, or nutrient deficiencies. If it's a soil sample, provide insights on soil health. If it's farm equipment, suggest maintenance tips." });
    }
  }

  const effectivePrompt = prompt || (imageBase64 ? "Analyze the provided image and provide advice." : "Provide agricultural advice.");
  parts.push({ text: effectivePrompt });

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts },
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            topK: 40,
        },
    });

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("Received an empty response from the AI.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get a response from the AI.");
  }
};