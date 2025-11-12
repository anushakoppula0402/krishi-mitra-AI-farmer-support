// types.ts
export interface Language {
  code: 'en' | 'hi' | 'ml' | 'te';
  name: string;
  bcp47: string;
}

export enum MessageRole {
  USER = 'user',
  AI = 'ai',
}

export interface User {
  username: string;
}

// Used internally by useAuth for storing user data
export interface UserCredentials {
  username: string;
  password: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  image?: string; // base64 encoded image
  feedback?: 'up' | 'down';
}

export interface Conversation {
  id: string;
  title: string;
  startTime: number;
  lastUpdateTime: number;
  messages: Message[];
}

export type MultilingualString = {
  en: string;
  hi: string;
  ml: string;
  te: string;
};

export interface WeatherAlert {
  id: number;
  type: 'heavyRain' | 'drought' | 'frost';
  message: MultilingualString;
}

export interface CropStage {
  name: MultilingualString;
  timing: MultilingualString;
}

export interface CropCalendar {
  id: number;
  cropName: MultilingualString;
  season: 'Kharif' | 'Rabi';
  stages: CropStage[];
}

export interface HelplineInfo {
  name: string;
  number: string;
  description: MultilingualString;
}

export interface StateAuthority {
  state: MultilingualString;
  department: MultilingualString;
  number: string;
}

export interface Machinery {
  name: MultilingualString;
  description: MultilingualString;
  image: string; // URL for the image
  cost: number; // Estimated cost in INR
  subsidy: {
    available: boolean;
    details: MultilingualString;
  };
  link: string;
}

export interface MachineryCategory {
  id: string;
  name: MultilingualString;
  machinery: Machinery[];
}

export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  description: string;
  icon: string;
}

export interface BudgetItem {
  item: MultilingualString;
  cost: number; // per acre
  icon: string;
}

export interface CropBudget {
  id: number;
  cropName: MultilingualString;
  expenditure: BudgetItem[];
  estimatedYield: {
    amount: number; // quintals per acre
    unit: MultilingualString;
  };
  estimatedPrice: number; // per quintal
}

export interface AgriculturalOffice {
  state: string; // Use 'en' name as key
  district: MultilingualString;
  name: MultilingualString;
  address: MultilingualString;
  contact: string;
}