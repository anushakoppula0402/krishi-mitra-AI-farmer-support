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
  _id?: string;
  username: string;
  email?: string;
  password: string;
  profile?: {
    farmLocation?: string;
    farmSize?: number;
    primaryCrops?: string[];
    contactNumber?: string;
  };
  preferences?: {
    language: Language;
    notifications: {
      weather: boolean;
      market: boolean;
      schemes: boolean;
    };
  };
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  _id?: string;
  conversationId: string;
  role: MessageRole;
  text: string;
  imageUrl?: string;
  feedback?: 'up' | 'down';
  metadata?: {
    responseTime?: number;
    model?: string;
  };
  createdAt?: Date;
}

export interface Conversation {
  _id?: string;
  userId: string;
  title: string;
  messages: string[]; // Array of message IDs
  startTime: Date;
  lastUpdateTime: Date;
  isActive: boolean;
  metadata?: {
    totalMessages?: number;
    avgResponseTime?: number;
  };
}

export type MultilingualString = {
  en: string;
  hi: string;
  ml: string;
  te: string;
};

export interface WeatherAlert {
  _id?: string;
  type: 'heavyRain' | 'drought' | 'frost' | 'storm' | 'hail';
  message: MultilingualString;
  severity: 'low' | 'medium' | 'high' | 'critical';
  regions: string[];
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt?: Date;
}

export interface CropStage {
  name: MultilingualString;
  timing: MultilingualString;
  tasks: MultilingualString[];
}

export interface CropCalendar {
  _id?: string;
  cropName: MultilingualString;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  region: string;
  stages: CropStage[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MarketPrice {
  _id?: string;
  cropName: string;
  variety?: string;
  price: number;
  unit: string;
  market: string;
  state: string;
  district?: string;
  trend: 'up' | 'down' | 'stable';
  priceDate: Date;
  isVerified: boolean;
  createdAt?: Date;
}

export interface GovernmentScheme {
  _id?: string;
  name: MultilingualString;
  description: MultilingualString;
  eligibility: MultilingualString;
  benefits: MultilingualString;
  applicationProcess: MultilingualString;
  documents: MultilingualString[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  states: string[];
  category: 'subsidy' | 'loan' | 'insurance' | 'training' | 'equipment';
  isActive: boolean;
  validFrom?: Date;
  validUntil?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Machinery {
  _id?: string;
  name: MultilingualString;
  description: MultilingualString;
  category: 'tractors' | 'harvesters' | 'tillers' | 'sprayers' | 'seeders' | 'other';
  specifications: {
    power?: string;
    capacity?: string;
    fuelType?: string;
    manufacturer?: string;
  };
  pricing: {
    cost: number;
    currency: string;
    priceType: 'purchase' | 'rental' | 'both';
    rentalRate?: number;
    rentalUnit?: 'hour' | 'day' | 'month';
  };
  subsidy?: {
    available: boolean;
    percentage?: number;
    details: MultilingualString;
    scheme?: string;
  };
  availability: {
    regions: string[];
    dealers: Array<{
      name: string;
      contact: string;
      location: string;
    }>;
  };
  images: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BudgetItem {
  item: MultilingualString;
  cost: number;
  unit: string;
  category: 'seeds' | 'fertilizer' | 'pesticides' | 'labor' | 'fuel' | 'equipment' | 'other';
  isOptional: boolean;
}

export interface CropBudget {
  _id?: string;
  cropName: MultilingualString;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  region: string;
  farmSize: number; // in acres
  expenditure: BudgetItem[];
  estimatedYield: {
    amount: number;
    unit: string;
  };
  estimatedIncome: number;
  profitMargin: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}