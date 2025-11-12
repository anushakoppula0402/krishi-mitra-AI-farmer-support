import { Router, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import axios from 'axios';
import { authenticate, AuthRequest, optionalAuth } from '../middleware/auth.js';
import { MarketPrice, WeatherAlert } from '../models/index.js';
import { ApiResponse } from '../types/index.js';

const router = Router();

// Weather service
const getWeatherData = async (city: string) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('Weather service not configured');
  }

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = response.data;
  
  const degreesToCardinal = (deg: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  const formatTime = (timestamp: number, timezoneOffset: number): string => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true });
  };

  return {
    city: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDirection: degreesToCardinal(data.wind.deg || 0),
    pressure: data.main.pressure,
    visibility: data.visibility / 1000,
    sunrise: formatTime(data.sys.sunrise, data.timezone),
    sunset: formatTime(data.sys.sunset, data.timezone),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};

// Get weather data
router.get('/weather', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { city } = req.query;

    if (!city || typeof city !== 'string') {
      const response: ApiResponse = {
        success: false,
        error: 'City parameter is required'
      };
      res.status(400).json(response);
      return;
    }

    try {
      const weatherData = await getWeatherData(city);
      
      const response: ApiResponse = {
        success: true,
        data: { weather: weatherData }
      };

      res.json(response);
    } catch (weatherError) {
      console.error('Weather API error:', weatherError);
      
      let errorMessage = 'Failed to fetch weather data';
      if (axios.isAxiosError(weatherError)) {
        if (weatherError.response?.status === 404) {
          errorMessage = 'City not found';
        } else if (weatherError.response?.status === 401) {
          errorMessage = 'Weather service unavailable';
        }
      }

      const response: ApiResponse = {
        success: false,
        error: errorMessage
      };

      res.status(500).json(response);
    }
  } catch (error) {
    console.error('Weather endpoint error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

// Get weather alerts
router.get('/weather-alerts', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { region, type } = req.query;
    
    const filter: any = {
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    };

    if (region && typeof region === 'string') {
      filter.regions = { $in: [region] };
    }

    if (type && typeof type === 'string') {
      filter.type = type;
    }

    const alerts = await WeatherAlert.find(filter)
      .sort({ severity: 1, createdAt: -1 })
      .limit(10);

    const response: ApiResponse = {
      success: true,
      data: { alerts }
    };

    res.json(response);
  } catch (error) {
    console.error('Weather alerts error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch weather alerts'
    };
    res.status(500).json(response);
  }
});

// Get market prices
router.get('/market-prices', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { 
      crop, 
      state, 
      district, 
      page = '1', 
      limit = '20',
      sortBy = 'priceDate',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 20;
    const skip = (pageNum - 1) * limitNum;

    const filter: any = { isVerified: true };
    
    if (crop && typeof crop === 'string') {
      filter.cropName = new RegExp(crop, 'i');
    }
    
    if (state && typeof state === 'string') {
      filter.state = new RegExp(state, 'i');
    }
    
    if (district && typeof district === 'string') {
      filter.district = new RegExp(district, 'i');
    }

    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sortObj: any = {};
    sortObj[sortBy as string] = sortDirection;

    const prices = await MarketPrice.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await MarketPrice.countDocuments(filter);

    const response: ApiResponse = {
      success: true,
      data: { prices },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Market prices error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch market prices'
    };
    res.status(500).json(response);
  }
});

// Get crop calendar (mock data for now)
router.get('/crop-calendar', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { crop, season, region } = req.query;

    // Mock crop calendar data
    const mockCropCalendar = [
      {
        id: 1,
        cropName: {
          en: 'Rice',
          hi: 'चावल',
          ml: 'അരി',
          te: 'బియ్యం'
        },
        season: 'Kharif',
        region: 'South India',
        stages: [
          {
            name: {
              en: 'Land Preparation',
              hi: 'भूमि की तैयारी',
              ml: 'ഭൂമി തയ്യാറാക്കൽ',
              te: 'భూమి తయారీ'
            },
            timing: {
              en: 'May-June',
              hi: 'मई-जून',
              ml: 'മെയ്-ജൂൺ',
              te: 'మే-జూన్'
            },
            tasks: {
              en: 'Plowing, leveling, and preparing nursery beds',
              hi: 'जुताई, समतल करना और नर्सरी बेड तैयार करना',
              ml: 'ഉഴുത്, നിരപ്പാക്കൽ, നാമ്പ് തയ്യാറാക്കൽ',
              te: 'దున్నుట, సమం చేయుట మరియు నర్సరీ బెడ్స్ తయ్యారు చేయుట'
            }
          }
        ]
      }
    ];

    let filteredData = mockCropCalendar;

    if (crop && typeof crop === 'string') {
      filteredData = filteredData.filter(item => 
        item.cropName.en.toLowerCase().includes(crop.toLowerCase())
      );
    }

    if (season && typeof season === 'string') {
      filteredData = filteredData.filter(item => 
        item.season.toLowerCase() === season.toLowerCase()
      );
    }

    if (region && typeof region === 'string') {
      filteredData = filteredData.filter(item => 
        item.region.toLowerCase().includes(region.toLowerCase())
      );
    }

    const response: ApiResponse = {
      success: true,
      data: { cropCalendar: filteredData }
    };

    res.json(response);
  } catch (error) {
    console.error('Crop calendar error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch crop calendar'
    };
    res.status(500).json(response);
  }
});

// Get government schemes (mock data)
router.get('/schemes', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { category, state } = req.query;

    const mockSchemes = [
      {
        id: 1,
        name: {
          en: 'PM-KISAN Scheme',
          hi: 'पीएम-किसान योजना',
          ml: 'പിഎം-കിസാൻ സ്കീം',
          te: 'పిఎం-కిసాన్ పథకం'
        },
        description: {
          en: 'Direct income support to farmers',
          hi: 'किसानों को प्रत्यक्ष आय सहायता',
          ml: 'കർഷകർക്ക് നേരിട്ടുള്ള വരുമാന പിന്തുണ',
          te: 'రైతులకు ప్రత్యక్ష ఆదాయ మద్దతు'
        },
        category: 'subsidy',
        states: ['All India'],
        isActive: true
      }
    ];

    let filteredSchemes = mockSchemes;

    if (category && typeof category === 'string') {
      filteredSchemes = filteredSchemes.filter(scheme => 
        scheme.category === category
      );
    }

    if (state && typeof state === 'string') {
      filteredSchemes = filteredSchemes.filter(scheme => 
        scheme.states.includes('All India') || 
        scheme.states.some(s => s.toLowerCase().includes(state.toLowerCase()))
      );
    }

    const response: ApiResponse = {
      success: true,
      data: { schemes: filteredSchemes }
    };

    res.json(response);
  } catch (error) {
    console.error('Government schemes error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch government schemes'
    };
    res.status(500).json(response);
  }
});

// Get machinery information (mock data)
router.get('/machinery', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { category, region, priceRange } = req.query;

    const mockMachinery = [
      {
        id: 1,
        name: {
          en: 'Tractor 45 HP',
          hi: '45 एचपी ट्रैक्टर',
          ml: '45 എച്ച്പി ട്രാക്ടർ',
          te: '45 హెచ్‌పి ట్రాక్టర్'
        },
        category: 'tractors',
        pricing: {
          cost: 650000,
          currency: 'INR',
          priceType: 'purchase'
        },
        subsidy: {
          available: true,
          percentage: 25,
          details: {
            en: '25% subsidy available under state scheme',
            hi: 'राज्य योजना के तहत 25% सब्सिडी उपलब्ध',
            ml: 'സംസ്ഥാന പദ്ധതിയിൽ 25% സബ്സിഡി ലഭ്യം',
            te: 'రాష్ట్ర పథకంలో 25% సబ్సిడీ అందుబాటులో'
          }
        },
        isActive: true
      }
    ];

    let filteredMachinery = mockMachinery;

    if (category && typeof category === 'string') {
      filteredMachinery = filteredMachinery.filter(item => 
        item.category === category
      );
    }

    const response: ApiResponse = {
      success: true,
      data: { machinery: filteredMachinery }
    };

    res.json(response);
  } catch (error) {
    console.error('Machinery error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch machinery information'
    };
    res.status(500).json(response);
  }
});

// Get budget planning data (mock data)
router.get('/budget-planner', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { crop, farmSize, region } = req.query;

    const mockBudgetData = [
      {
        id: 1,
        cropName: {
          en: 'Rice',
          hi: 'चावल',
          ml: 'അരി',
          te: 'బియ్యం'
        },
        season: 'Kharif',
        region: 'South India',
        farmSize: 1, // per acre
        expenditure: [
          {
            item: {
              en: 'Seeds',
              hi: 'बीज',
              ml: 'വിത്ത്',
              te: 'విత్తనాలు'
            },
            cost: 2500,
            unit: 'per acre',
            category: 'seeds',
            isOptional: false
          },
          {
            item: {
              en: 'Fertilizers',
              hi: 'उर्वरक',
              ml: 'വളം',
              te: 'ఎరువులు'
            },
            cost: 8000,
            unit: 'per acre',
            category: 'fertilizer',
            isOptional: false
          }
        ],
        estimatedYield: {
          amount: 25,
          unit: 'quintals per acre'
        },
        estimatedIncome: 62500,
        profitMargin: 35000
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: { budgetData: mockBudgetData }
    };

    res.json(response);
  } catch (error) {
    console.error('Budget planner error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch budget data'
    };
    res.status(500).json(response);
  }
});

// Get helpline information (mock data)
router.get('/helpline', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { state, type } = req.query;

    const mockHelplines = [
      {
        id: 1,
        name: 'Kisan Call Centre',
        number: '1800-180-1551',
        description: {
          en: '24x7 helpline for farmers',
          hi: 'किसानों के लिए 24x7 हेल्पलाइन',
          ml: 'കർഷകർക്കായി 24x7 ഹെൽപ്‌ലൈൻ',
          te: 'రైతుల కోసం 24x7 హెల్ప్‌లైన్'
        },
        type: 'national',
        state: 'All India'
      }
    ];

    const response: ApiResponse = {
      success: true,
      data: { helplines: mockHelplines }
    };

    res.json(response);
  } catch (error) {
    console.error('Helpline error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch helpline information'
    };
    res.status(500).json(response);
  }
});

export { router as agriculturalRoutes };