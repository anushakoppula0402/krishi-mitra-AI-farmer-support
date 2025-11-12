import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

// Weather condition translations
const WEATHER_TRANSLATIONS = {
  en: {
    'Sunny': 'Sunny',
    'Clear': 'Clear',
    'Partly cloudy': 'Partly cloudy',
    'Cloudy': 'Cloudy',
    'Overcast': 'Overcast',
    'Mist': 'Mist',
    'Patchy rain possible': 'Patchy rain possible',
    'Patchy snow possible': 'Patchy snow possible',
    'Patchy sleet possible': 'Patchy sleet possible',
    'Patchy freezing drizzle possible': 'Patchy freezing drizzle possible',
    'Thundery outbreaks possible': 'Thundery outbreaks possible',
    'Blowing snow': 'Blowing snow',
    'Blizzard': 'Blizzard',
    'Fog': 'Fog',
    'Freezing fog': 'Freezing fog',
    'Patchy light drizzle': 'Patchy light drizzle',
    'Light drizzle': 'Light drizzle',
    'Freezing drizzle': 'Freezing drizzle',
    'Heavy freezing drizzle': 'Heavy freezing drizzle',
    'Patchy light rain': 'Patchy light rain',
    'Light rain': 'Light rain',
    'Moderate rain at times': 'Moderate rain at times',
    'Moderate rain': 'Moderate rain',
    'Heavy rain at times': 'Heavy rain at times',
    'Heavy rain': 'Heavy rain',
    'Light freezing rain': 'Light freezing rain',
    'Moderate or heavy freezing rain': 'Moderate or heavy freezing rain',
    'Light sleet': 'Light sleet',
    'Moderate or heavy sleet': 'Moderate or heavy sleet',
    'Patchy light snow': 'Patchy light snow',
    'Light snow': 'Light snow',
    'Patchy moderate snow': 'Patchy moderate snow',
    'Moderate snow': 'Moderate snow',
    'Patchy heavy snow': 'Patchy heavy snow',
    'Heavy snow': 'Heavy snow',
    'Ice pellets': 'Ice pellets',
    'Light rain shower': 'Light rain shower',
    'Moderate or heavy rain shower': 'Moderate or heavy rain shower',
    'Torrential rain shower': 'Torrential rain shower',
    'Light sleet showers': 'Light sleet showers',
    'Moderate or heavy sleet showers': 'Moderate or heavy sleet showers',
    'Light snow showers': 'Light snow showers',
    'Moderate or heavy snow showers': 'Moderate or heavy snow showers',
    'Light showers of ice pellets': 'Light showers of ice pellets',
    'Moderate or heavy showers of ice pellets': 'Moderate or heavy showers of ice pellets',
    'Patchy light rain with thunder': 'Patchy light rain with thunder',
    'Moderate or heavy rain with thunder': 'Moderate or heavy rain with thunder',
    'Patchy light snow with thunder': 'Patchy light snow with thunder',
    'Moderate or heavy snow with thunder': 'Moderate or heavy snow with thunder'
  },
  hi: {
    'Sunny': 'धूप',
    'Clear': 'साफ',
    'Partly cloudy': 'आंशिक रूप से बादल',
    'Cloudy': 'बादल',
    'Overcast': 'घने बादल',
    'Mist': 'धुंध',
    'Patchy rain possible': 'बारिश की संभावना',
    'Patchy snow possible': 'बर्फ की संभावना',
    'Patchy sleet possible': 'बर्फीली बारिश संभावित',
    'Patchy freezing drizzle possible': 'जमी हुई बूंदाबांदी संभावित',
    'Thundery outbreaks possible': 'तूफान की संभावना',
    'Blowing snow': 'उड़ती बर्फ',
    'Blizzard': 'बर्फीला तूफान',
    'Fog': 'कोहरा',
    'Freezing fog': 'जमा हुआ कोहरा',
    'Patchy light drizzle': 'हल्की बूंदाबांदी',
    'Light drizzle': 'हल्की फुहार',
    'Freezing drizzle': 'जमी हुई बूंदाबांदी',
    'Heavy freezing drizzle': 'भारी जमी बूंदाबांदी',
    'Patchy light rain': 'हल्की बारिश',
    'Light rain': 'हल्की बारिश',
    'Moderate rain at times': 'कभी-कभी मध्यम बारिश',
    'Moderate rain': 'मध्यम बारिश',
    'Heavy rain at times': 'कभी-कभी भारी बारिश',
    'Heavy rain': 'भारी बारिश',
    'Light freezing rain': 'हल्की जमी बारिश',
    'Moderate or heavy freezing rain': 'मध्यम या भारी जमी बारिश',
    'Light sleet': 'हल्की बर्फीली बारिश',
    'Moderate or heavy sleet': 'मध्यम या भारी बर्फीली बारिश',
    'Patchy light snow': 'हल्की बर्फबारी',
    'Light snow': 'हल्की बर्फबारी',
    'Patchy moderate snow': 'मध्यम बर्फबारी',
    'Moderate snow': 'मध्यम बर्फबारी',
    'Patchy heavy snow': 'भारी बर्फबारी',
    'Heavy snow': 'भारी बर्फबारी',
    'Ice pellets': 'बर्फ के टुकड़े',
    'Light rain shower': 'हल्की बारिश की बौछार',
    'Moderate or heavy rain shower': 'मध्यम या भारी बारिश की बौछार',
    'Torrential rain shower': 'मूसलधार बारिश',
    'Light sleet showers': 'हल्की बर्फीली बौछार',
    'Moderate or heavy sleet showers': 'मध्यम या भारी बर्फीली बौछार',
    'Light snow showers': 'हल्की बर्फ की बौछार',
    'Moderate or heavy snow showers': 'मध्यम या भारी बर्फ की बौछार',
    'Light showers of ice pellets': 'बर्फ के टुकड़ों की हल्की बौछार',
    'Moderate or heavy showers of ice pellets': 'बर्फ के टुकड़ों की भारी बौछार',
    'Patchy light rain with thunder': 'गर्जन के साथ हल्की बारिश',
    'Moderate or heavy rain with thunder': 'गर्जन के साथ भारी बारिश',
    'Patchy light snow with thunder': 'गर्जन के साथ हल्की बर्फबारी',
    'Moderate or heavy snow with thunder': 'गर्जन के साथ भारी बर्फबारी'
  },
  ml: {
    'Sunny': 'വെയിലുള്ള',
    'Clear': 'തെളിഞ്ഞ',
    'Partly cloudy': 'ഭാഗികമായി മേഘാവൃതം',
    'Cloudy': 'മേഘാവൃതം',
    'Overcast': 'കനത്ത മേഘാവൃതം',
    'Mist': 'മൂടൽമഞ്ഞ്',
    'Patchy rain possible': 'മഴയ്ക്കു സാധ്യത',
    'Patchy snow possible': 'മഞ്ഞിനു സാധ്യത',
    'Patchy sleet possible': 'മഞ്ഞുമഴയ്ക്കു സാധ്യത',
    'Patchy freezing drizzle possible': 'തണുത്ത തുള്ളിമഴയ്ക്കു സാധ്യത',
    'Thundery outbreaks possible': 'ഇടിമിന്നലിനു സാധ്യത',
    'Blowing snow': 'കാറ്റിൽ പറക്കുന്ന മഞ്ഞ്',
    'Blizzard': 'മഞ്ഞുകൊടുങ്കാറ്റ്',
    'Fog': 'മൂടൽമഞ്ഞ്',
    'Freezing fog': 'തണുത്ത മൂടൽമഞ്ഞ്',
    'Patchy light drizzle': 'ഇടയ്ക്കിടെ ഹല്ലക തുള്ളിമഴ',
    'Light drizzle': 'ഹല്ലക തുള്ളിമഴ',
    'Freezing drizzle': 'തണുത്ത തുള്ളിമഴ',
    'Heavy freezing drizzle': 'കനത്ത തണുത്ത തുള്ളിമഴ',
    'Patchy light rain': 'ഇടയ്ക്കിടെ ഹല്ലക മഴ',
    'Light rain': 'ഹല്ലക മഴ',
    'Moderate rain at times': 'ഇടയ്ക്കിടെ മിതമായ മഴ',
    'Moderate rain': 'മിതമായ മഴ',
    'Heavy rain at times': 'ഇടയ്ക്കിടെ കനത്ത മഴ',
    'Heavy rain': 'കനത്ത മഴ',
    'Light freezing rain': 'ഹല്ലക തണുത്ത മഴ',
    'Moderate or heavy freezing rain': 'മിതമായതോ കനത്തതോ ആയ തണുത്ത മഴ',
    'Light sleet': 'ഹല്ലക മഞ്ഞുമഴ',
    'Moderate or heavy sleet': 'മിതമായതോ കനത്തതോ ആയ മഞ്ഞുമഴ',
    'Patchy light snow': 'ഇടയ്ക്കിടെ ഹല്ലക മഞ്ഞ്',
    'Light snow': 'ഹല്ലക മഞ്ഞ്',
    'Patchy moderate snow': 'ഇടയ്ക്കിടെ മിതമായ മഞ്ഞ്',
    'Moderate snow': 'മിതമായ മഞ്ഞ്',
    'Patchy heavy snow': 'ഇടയ്ക്കിടെ കനത്ത മഞ്ഞ്',
    'Heavy snow': 'കനത്ത മഞ്ഞ്',
    'Ice pellets': 'മഞ്ഞു കഷണങ്ങൾ',
    'Light rain shower': 'ഹല്ലക മഴത്തുള്ളികൾ',
    'Moderate or heavy rain shower': 'മിതമായതോ കനത്തതോ ആയ മഴത്തുള്ളികൾ',
    'Torrential rain shower': 'കനത്ത മഴ',
    'Light sleet showers': 'ഹല്ലക മഞ്ഞുമഴ തുള്ളികൾ',
    'Moderate or heavy sleet showers': 'മിതമായതോ കനത്തതോ ആയ മഞ്ഞുമഴ തുള്ളികൾ',
    'Light snow showers': 'ഹല്ലക മഞ്ഞ് തുള്ളികൾ',
    'Moderate or heavy snow showers': 'മിതമായതോ കനത്തതോ ആയ മഞ്ഞ് തുള്ളികൾ',
    'Light showers of ice pellets': 'മഞ്ഞു കഷണങ്ങളുടെ ഹല്ലക തുള്ളികൾ',
    'Moderate or heavy showers of ice pellets': 'മഞ്ഞു കഷണങ്ങളുടെ കനത്ത തുള്ളികൾ',
    'Patchy light rain with thunder': 'ഇടിമിന്നലോടെ ഹല്ലക മഴ',
    'Moderate or heavy rain with thunder': 'ഇടിമിന്നലോടെ കനത്ത മഴ',
    'Patchy light snow with thunder': 'ഇടിമിന്നലോടെ ഹല്ലക മഞ്ഞ്',
    'Moderate or heavy snow with thunder': 'ഇടിമിന്നലോടെ കനത്ത മഞ്ഞ്'
  },
  te: {
    'Sunny': 'ఎండ',
    'Clear': 'స్పష్టం',
    'Partly cloudy': 'పాక్షికంగా మేఘావృతం',
    'Cloudy': 'మేఘావృతం',
    'Overcast': 'దట్టమైన మేఘాలు',
    'Mist': 'పొగమంచు',
    'Patchy rain possible': 'వర్షం సాధ్యత',
    'Patchy snow possible': 'మంచు సాధ్యత',
    'Patchy sleet possible': 'మంచు వర్షం సాధ్యత',
    'Patchy freezing drizzle possible': 'గడ్డకట్టే చినుకులు సాధ్యత',
    'Thundery outbreaks possible': 'ఉరుములతో వర్షం సాధ్యత',
    'Blowing snow': 'గాలితో ఎగురుతున్న మంచు',
    'Blizzard': 'మంచు తుఫాను',
    'Fog': 'పొగమంచు',
    'Freezing fog': 'గడ్డకట్టే పొగమంచు',
    'Patchy light drizzle': 'తేలికపాటి చినుకులు',
    'Light drizzle': 'తేలికపాటి చినుకులు',
    'Freezing drizzle': 'గడ్డకట్టే చినుకులు',
    'Heavy freezing drizzle': 'బరువైన గడ్డకట్టే చినుకులు',
    'Patchy light rain': 'తేలికపాటి వర్షం',
    'Light rain': 'తేలికపాటి వర్షం',
    'Moderate rain at times': 'అప్పుడప్పుడు మోస్తరు వర్షం',
    'Moderate rain': 'మోస్తరు వర్షం',
    'Heavy rain at times': 'అప్పుడప్పుడు భారీ వర్షం',
    'Heavy rain': 'భారీ వర్షం',
    'Light freezing rain': 'తేలికపాటి గడ్డకట్టే వర్షం',
    'Moderate or heavy freezing rain': 'మోస్తరు లేదా భారీ గడ్డకట్టే వర్షం',
    'Light sleet': 'తేలికపాటి మంచు వర్షం',
    'Moderate or heavy sleet': 'మోస్తరు లేదా భారీ మంచు వర్షం',
    'Patchy light snow': 'తేలికపాటి మంచు',
    'Light snow': 'తేలికపాటి మంచు',
    'Patchy moderate snow': 'మోస్తరు మంచు',
    'Moderate snow': 'మోస్తరు మంచు',
    'Patchy heavy snow': 'భారీ మంచు',
    'Heavy snow': 'భారీ మంచు',
    'Ice pellets': 'మంచు ముక్కలు',
    'Light rain shower': 'తేలికపాటి వర్షం',
    'Moderate or heavy rain shower': 'మోస్తరు లేదా భారీ వర్షం',
    'Torrential rain shower': 'కుండపోత వర్షం',
    'Light sleet showers': 'తేలికపాటి మంచు వర్షం',
    'Moderate or heavy sleet showers': 'మోస్తరు లేదా భారీ మంచు వర్షం',
    'Light snow showers': 'తేలికపాటి మంచు వర్షం',
    'Moderate or heavy snow showers': 'మోస్తరు లేదా భారీ మంచు వర్షం',
    'Light showers of ice pellets': 'మంచు ముక్కల తేలిక వర్షం',
    'Moderate or heavy showers of ice pellets': 'మంచు ముక్కల భారీ వర్షం',
    'Patchy light rain with thunder': 'ఉరుములతో తేలిక వర్షం',
    'Moderate or heavy rain with thunder': 'ఉరుములతో భారీ వర్షం',
    'Patchy light snow with thunder': 'ఉరుములతో తేలిక మంచు',
    'Moderate or heavy snow with thunder': 'ఉరుములతో భారీ మంచు'
  }
};

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
      };
    }>;
  };
}

interface WeatherProps {
  onClose: () => void;
  language: Language;
}

const Weather: React.FC<WeatherProps> = ({ onClose, language }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const uiText = UI_STRINGS[language.code].weather;

  // Function to translate weather conditions
  const translateWeatherCondition = (englishCondition: string): string => {
    const translations = WEATHER_TRANSLATIONS[language.code as keyof typeof WEATHER_TRANSLATIONS] || WEATHER_TRANSLATIONS.en;
    return translations[englishCondition as keyof typeof translations] || englishCondition;
  };

  // Function to format date in local language
  const formatDateLocalized = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    if (date.toDateString() === today.toDateString()) {
      return uiText.today || 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return uiText.tomorrow || 'Tomorrow';
    } else if (date.toDateString() === dayAfterTomorrow.toDateString()) {
      return uiText.dayAfterTomorrow || 'Day After Tomorrow';
    } else {
      return date.toLocaleDateString(language.code === 'hi' ? 'hi-IN' : 
        language.code === 'ml' ? 'ml-IN' : 
        language.code === 'te' ? 'te-IN' : 'en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Popular Indian cities and regions with translations
  const popularLocations = {
    en: [
      'Delhi, India',
      'Mumbai, Maharashtra', 
      'Bangalore, Karnataka',
      'Chennai, Tamil Nadu',
      'Kolkata, West Bengal',
      'Hyderabad, Telangana',
      'Pune, Maharashtra',
      'Ahmedabad, Gujarat',
      'Jaipur, Rajasthan',
      'Lucknow, Uttar Pradesh',
      'Kochi, Kerala',
      'Indore, Madhya Pradesh',
      'Bhopal, Madhya Pradesh',
      'Patna, Bihar',
      'Chandigarh, Punjab'
    ],
    hi: [
      'दिल्ली, भारत',
      'मुंबई, महाराष्ट्र',
      'बैंगलोर, कर्नाटक', 
      'चेन्नई, तमिल नाडु',
      'कोलकाता, पश्चिम बंगाल',
      'हैदराबाद, तेलंगाना',
      'पुणे, महाराष्ट्र',
      'अहमदाबाद, गुजरात',
      'जयपुर, राजस्थान',
      'लखनऊ, उत्तर प्रदेश',
      'कोच्चि, केरल',
      'इंदौर, मध्य प्रदेश',
      'भोपाल, मध्य प्रदेश',
      'पटना, बिहार',
      'चंडीगढ़, पंजाब'
    ],
    ml: [
      'ഡൽഹി, ഇന്ത്യ',
      'മുംബൈ, മഹാരാഷ്ട്ര',
      'ബാംഗലൂർ, കർണാടക',
      'ചെന്നൈ, തമിഴ്നാട്',
      'കൊൽക്കത്ത, പശ്ചിമ ബംഗാൾ',
      'ഹൈദരാബാദ്, തെലങ്കാന',
      'പൂനെ, മഹാരാഷ്ട്ര',
      'അഹമ്മദാബാദ്, ഗുജറാത്ത്',
      'ജയ്പൂർ, രാജസ്ഥാൻ',
      'ലക്നൗ, ഉത്തർപ്രദേശ്',
      'കൊച്ചി, കേരളം',
      'ഇന്ദോർ, മധ്യപ്രദേശ്',
      'ഭോപ്പാൽ, മധ്യപ്രദേശ്',
      'പട്ന, ബിഹാർ',
      'ചണ്ഡീഗഢ്, പഞ്ചാബ്'
    ],
    te: [
      'ఢిల్లీ, భారతదేశం',
      'ముంబై, మహారాష్ట్ర',
      'బెంగళూరు, కర్ణాటక',
      'చెన్నై, తమిళనాడు',
      'కోల్‌కతా, పశ్చిమ బెంగాల్',
      'హైదరాబాద్, తెలంగాణ',
      'పూణె, మహారాష్ట్ర',
      'అహ్మదాబాద్, గుజరాత్',
      'జైపూర్, రాజస్థాన్',
      'లక్నో, ఉత్తర ప్రదేశ్',
      'కొచ్చి, కేరళ',
      'ఇండోర్, మధ్య ప్రదేశ్',
      'భోపాల్, మధ్య ప్రదేశ్',
      'పట్నా, బీహార్',
      'చండీగఢ్, పంజాబ్'
    ]
  };

  // Location mapping for API calls (always use English names for API)
  const locationMapping = {
    // Hindi to English mapping
    'दिल्ली, भारत': 'Delhi, India',
    'मुंबई, महाराष्ट्र': 'Mumbai, Maharashtra',
    'बैंगलोर, कर्नाटक': 'Bangalore, Karnataka',
    'चेन्नई, तमिल नाडु': 'Chennai, Tamil Nadu',
    'कोलकाता, पश्चिम बंगाल': 'Kolkata, West Bengal',
    'हैदराबाद, तेलंगाना': 'Hyderabad, Telangana',
    'पुणे, महाराष्ट्र': 'Pune, Maharashtra',
    'अहमदाबाद, गुजरात': 'Ahmedabad, Gujarat',
    'जयपुर, राजस्थान': 'Jaipur, Rajasthan',
    'लखनऊ, उत्तर प्रदेश': 'Lucknow, Uttar Pradesh',
    'कोच्चि, केरल': 'Kochi, Kerala',
    'इंदौर, मध्य प्रदेश': 'Indore, Madhya Pradesh',
    'भोपाल, मध्य प्रदेश': 'Bhopal, Madhya Pradesh',
    'पटना, बिहार': 'Patna, Bihar',
    'चंडीगढ़, पंजाब': 'Chandigarh, Punjab',
    // Malayalam to English mapping
    'ഡൽഹി, ഇന്ത്യ': 'Delhi, India',
    'മുംബൈ, മഹാരാഷ്ട്ര': 'Mumbai, Maharashtra',
    'ബാംഗലൂർ, കർണാടക': 'Bangalore, Karnataka',
    'ചെന്നൈ, തമിഴ്നാട്': 'Chennai, Tamil Nadu',
    'കൊൽക്കത്ത, പശ്ചിമ ബംഗാൾ': 'Kolkata, West Bengal',
    'ഹൈദരാബാദ്, തെലങ്കാന': 'Hyderabad, Telangana',
    'പൂനെ, മഹാരാഷ്ട്ര': 'Pune, Maharashtra',
    'അഹമ്മദാബാദ്, ഗുജറാത്ത്': 'Ahmedabad, Gujarat',
    'ജയ്പൂർ, രാജസ്ഥാൻ': 'Jaipur, Rajasthan',
    'ലക്നൗ, ഉത്തർപ്രദേശ്': 'Lucknow, Uttar Pradesh',
    'കൊച്ചി, കേരളം': 'Kochi, Kerala',
    'ഇന്ദോർ, മധ്യപ്രദേശ്': 'Indore, Madhya Pradesh',
    'ഭോപ്പാൽ, മധ്യപ്രദേശ്': 'Bhopal, Madhya Pradesh',
    'പട്ന, ബിഹാർ': 'Patna, Bihar',
    'ചണ്ഡീഗഢ്, പഞ്ചാബ്': 'Chandigarh, Punjab',
    // Telugu to English mapping
    'ఢిల్లీ, భారతదేశం': 'Delhi, India',
    'ముంబై, మహారాష్ట్ర': 'Mumbai, Maharashtra',
    'బెంగళూరు, కర్ణాటక': 'Bangalore, Karnataka',
    'చెన్నై, తమిళనాడు': 'Chennai, Tamil Nadu',
    'కోల్‌కతా, పశ్చిమ బెంగాల్': 'Kolkata, West Bengal',
    'హైదరాబాద్, తెలంగాణ': 'Hyderabad, Telangana',
    'పూణె, మహారాష్ట్ర': 'Pune, Maharashtra',
    'అహ్మదాబాద్, గుజరాత్': 'Ahmedabad, Gujarat',
    'జైపూర్, రాజస్థాన్': 'Jaipur, Rajasthan',
    'లక్నో, ఉత్తర ప్రదేశ్': 'Lucknow, Uttar Pradesh',
    'కొచ్చి, కేరళ': 'Kochi, Kerala',
    'ఇండోర్, మధ్య ప్రదేశ్': 'Indore, Madhya Pradesh',
    'భోపాల్, మధ్య ప్రదేశ్': 'Bhopal, Madhya Pradesh',
    'పట్నా, బీహార్': 'Patna, Bihar',
    'చండీగఢ్, పంజాబ్': 'Chandigarh, Punjab'
  };

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('weather_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recent searches:', e);
      }
    }
    
    // Load default location (Delhi) - always use English for API
    fetchWeather('Delhi, India');
  }, []);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      
      // Check if API key is properly configured
      if (!API_KEY || API_KEY === 'your_weatherapi_key_here' || API_KEY === 'demo_key' || API_KEY.length < 10) {
        // Show demo data with API key setup instructions
        setError(`${uiText.fetchError}

To get real weather data:
1. Visit https://www.weatherapi.com/
2. Sign up for a free account
3. Get your API key
4. Add it to your .env file as VITE_WEATHER_API_KEY=your_actual_api_key
5. Restart the development server`);
        
        // Set demo data for the searched location
        const demoData: WeatherData = {
          location: {
            name: location.split(',')[0] || location,
            region: location.includes(',') ? location.split(',')[1]?.trim() || 'India' : 'India',
            country: 'India',
            lat: 28.6139,
            lon: 77.2090,
            tz_id: 'Asia/Kolkata',
            localtime: new Date().toISOString().slice(0, 16).replace('T', ' ')
          },
          current: {
            last_updated: new Date().toISOString().slice(0, 16).replace('T', ' '),
            temp_c: 28,
            temp_f: 82,
            is_day: 1,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 6.9,
            wind_kph: 11.2,
            wind_degree: 230,
            wind_dir: 'SW',
            pressure_mb: 1013.0,
            pressure_in: 29.92,
            precip_mm: 0.0,
            precip_in: 0.0,
            humidity: 65,
            cloud: 25,
            feelslike_c: 30,
            feelslike_f: 86,
            vis_km: 10.0,
            vis_miles: 6.0,
            uv: 7
          },
          forecast: {
            forecastday: [
              {
                date: new Date().toISOString().slice(0, 10),
                day: {
                  maxtemp_c: 32,
                  mintemp_c: 24,
                  condition: {
                    text: 'Partly cloudy',
                    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
                  },
                  chance_of_rain: 20
                }
              },
              {
                date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
                day: {
                  maxtemp_c: 30,
                  mintemp_c: 22,
                  condition: {
                    text: 'Sunny',
                    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
                  },
                  chance_of_rain: 10
                }
              },
              {
                date: new Date(Date.now() + 172800000).toISOString().slice(0, 10),
                day: {
                  maxtemp_c: 29,
                  mintemp_c: 21,
                  condition: {
                    text: 'Light rain',
                    icon: '//cdn.weatherapi.com/weather/64x64/day/296.png'
                  },
                  chance_of_rain: 70
                }
              }
            ]
          }
        };
        
        setWeatherData(demoData);
        return;
      }
      
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(`Location "${location}" not found. Please try a different location.`);
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your WeatherAPI.com key in the .env file.');
        } else if (response.status === 403) {
          throw new Error('API key quota exceeded. Please check your WeatherAPI.com plan.');
        } else {
          throw new Error(`Weather service error (${response.status}). Please try again later.`);
        }
      }
      
      const data: WeatherData = await response.json();
      setWeatherData(data);
      
      // Add to recent searches
      const updatedSearches = [location, ...recentSearches.filter(s => s !== location)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('weather_recent_searches', JSON.stringify(updatedSearches));
      
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err instanceof Error ? err.message : uiText.fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeather(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleLocationClick = (location: string) => {
    // Map localized location names to English for API calls
    const englishLocation = locationMapping[location as keyof typeof locationMapping] || location;
    fetchWeather(englishLocation);
  };

  // Get current language locations
  const currentLanguageLocations = popularLocations[language.code as keyof typeof popularLocations] || popularLocations.en;

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" title="Close" />
          </button>
        </header>

        {/* Search Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={uiText.searchPlaceholder}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              <Icon name="search" className="w-5 h-5" title="Search" />
            </button>
          </div>

          {/* Search Tips */}
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>{language.code === 'hi' ? 'खोज युक्तियाँ:' : 
                        language.code === 'ml' ? 'തിരയൽ നുറുങ്ങുകൾ:' :
                        language.code === 'te' ? 'వెతుకులాట చిట్కాలు:' : 'Search Tips:'}</strong>
            </p>
            <ul className="text-sm text-yellow-700 mt-1 ml-4 list-disc">
              <li>{language.code === 'hi' ? 'गाँव का नाम, जिला और राज्य टाइप करें (जैसे: "सिरसा गाँव, हरियाणा")' :
                     language.code === 'ml' ? 'ഗ്രാമത്തിന്റെ പേര്, ജില്ല, സംസ്ഥാനം ടൈപ്പ് ചെയ്യുക (ഉദാ: "കുമരകം, കേരളം")' :
                     language.code === 'te' ? 'గ్రామం పేరు, జిల్లా, రాష్ట్రం టైప్ చేయండి (ఉదా: "శ్రీకాకుళం, ఆంధ్రప్రదేశ్")' :
                     'Type village name, district, and state (e.g. "Kumrakom, Kerala")'}</li>
              <li>{language.code === 'hi' ? 'अधिक सटीक परिणामों के लिए ", India" जोड़ें' :
                     language.code === 'ml' ? 'കൂടുതൽ കൃത്യമായ ഫലങ്ങൾക്കായി ", India" ചേർക്കുക' :
                     language.code === 'te' ? 'మరింత ఖచ్చితమైన ఫలితాల కోసం ", India" జోడించండి' :
                     'Add ", India" for more accurate results'}</li>
            </ul>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{uiText.recentSearches}:</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationClick(location)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Locations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{uiText.popularLocations}:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {currentLanguageLocations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                >
                  {location.split(',')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">{language.code === 'hi' ? 'मौसम डेटा लोड हो रहा है...' : language.code === 'ml' ? 'കാലാവസ്ഥാ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...' : language.code === 'te' ? 'వాతావరణ డేటా లోడ్ అవుతోంది...' : 'Loading weather data...'}</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                <Icon name="alert" className="w-12 h-12 mx-auto mb-2" />
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-lg mb-2">{language.code === 'hi' ? 'मौसम सेवा समस्या' : language.code === 'ml' ? 'കാലാവസ്ഥാ സേവന പ്രശ്നം' : language.code === 'te' ? 'వాతావరణ సేవా సమస్య' : 'Weather Service Issue'}</h3>
                  <pre className="text-sm whitespace-pre-wrap">{error}</pre>
                  {error.includes('API key') && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-blue-800 font-semibold mb-1">{language.code === 'hi' ? '🔧 त्वरित सेटअप:' : language.code === 'ml' ? '🔧 വേഗത്തിലുള്ള സെറ്റപ്പ്:' : language.code === 'te' ? '🔧 త్వరిత సెటప్:' : '🔧 Quick Setup:'}</p>
                      <ol className="text-blue-700 text-sm list-decimal list-inside space-y-1">
                        <li>{language.code === 'hi' ? 'WeatherAPI.com पर जाएं' : language.code === 'ml' ? 'WeatherAPI.com-ൽ പോകുക' : language.code === 'te' ? 'WeatherAPI.com కు వెళ్ళండి' : 'Go to'} <a href="https://www.weatherapi.com/signup.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">WeatherAPI.com</a></li>
                        <li>{language.code === 'hi' ? 'मुफ्त साइन अप करें (कोई क्रेडिट कार्ड आवश्यक नहीं)' : language.code === 'ml' ? 'സൗജന്യമായി സൈൻ അപ്പ് ചെയ്യുക (ക്രെഡിറ്റ് കാർഡ് ആവശ്യമില്ല)' : language.code === 'te' ? 'ఉచితంగా సైన్ అప్ చేయండి (క్రెడిట్ కార్డ్ అవసరం లేదు)' : 'Sign up for free (no credit card needed)'}</li>
                        <li>{language.code === 'hi' ? 'डैशबोर्ड से अपनी API की कॉपी करें' : language.code === 'ml' ? 'ഡാഷ്ബോർഡിൽ നിന്ന് നിങ്ങളുടെ API കീ കോപ്പി ചെയ്യുക' : language.code === 'te' ? 'డ్యాష్‌బోర్డ్ నుండి మీ API కీని కాపీ చేయండి' : 'Copy your API key from the dashboard'}</li>
                        <li>{language.code === 'hi' ? 'अपनी .env फाइल में "your_weatherapi_key_here" को बदलें' : language.code === 'ml' ? 'നിങ്ങളുടെ .env ഫയലിൽ "your_weatherapi_key_here" മാറ്റിസ്ഥാപിക്കുക' : language.code === 'te' ? 'మీ .env ఫైల్‌లో "your_weatherapi_key_here" ని మార్చండి' : 'Replace "your_weatherapi_key_here" in your .env file'}</li>
                        <li>{language.code === 'hi' ? 'अपना डेवलपमेंट सर्वर पुनः आरंभ करें' : language.code === 'ml' ? 'നിങ്ങളുടെ ഡെവലപ്‌മെന്റ് സെർവർ പുനരാരംഭിക്കുക' : language.code === 'te' ? 'మీ డెవలప్‌మెంట్ సర్వర్‌ను పునఃప్రారంభించండి' : 'Restart your development server'}</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
              {weatherData && (
                <p className="text-gray-600 mt-4">{language.code === 'hi' ? 'प्रदर्शन उद्देश्यों के लिए डेमो डेटा दिखा रहा है' : language.code === 'ml' ? 'പ്രദർശന ആവശ്യങ്ങൾക്കായി ഡെമോ ഡാറ്റ കാണിക്കുന്നു' : language.code === 'te' ? 'ప్రదర్శన ప్రయోజనాల కోసం డెమో డేటాను చూపిస్తోంది' : 'Showing demo data for demonstration purposes'}</p>
              )}
            </div>
          )}

          {weatherData && !loading && (
            <div className="space-y-6">
              {/* Current Weather */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{weatherData.location.name}</h3>
                    <p className="text-blue-100">{weatherData.location.region}, {weatherData.location.country}</p>
                    <p className="text-blue-100 text-sm">{language.code === 'hi' ? 'अपडेट किया गया:' : language.code === 'ml' ? 'അപ്ഡേറ്റ് ചെയ്തത്:' : language.code === 'te' ? 'నవీకరించబడింది:' : 'Updated:'} {formatTime(weatherData.current.last_updated)}</p>
                  </div>
                  <img 
                    src={`https:${weatherData.current.condition.icon}`} 
                    alt={weatherData.current.condition.text}
                    className="w-16 h-16"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-bold">{Math.round(weatherData.current.temp_c)}°C</div>
                    <div className="text-xl">{translateWeatherCondition(weatherData.current.condition.text)}</div>
                    <div className="text-blue-100">{language.code === 'hi' ? 'महसूस होता है' : language.code === 'ml' ? 'അനുഭവപ്പെടുന്നത്' : language.code === 'te' ? 'అనిపిస్తుంది' : 'Feels like'} {Math.round(weatherData.current.feelslike_c)}°C</div>
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Icon name="waterDrop" className="w-8 h-8 text-blue-500 mx-auto mb-2" title={language.code === 'hi' ? 'नमी' : language.code === 'ml' ? 'ഈർപ്പം' : language.code === 'te' ? 'తేమ' : 'Humidity'} />
                  <div className="text-2xl font-bold text-gray-800">{weatherData.current.humidity}%</div>
                  <div className="text-gray-600">{uiText.humidity}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Icon name="wind" className="w-8 h-8 text-green-500 mx-auto mb-2" title={language.code === 'hi' ? 'हवा की गति' : language.code === 'ml' ? 'കാറ്റിന്റെ വേഗത' : language.code === 'te' ? 'గాలి వేగం' : 'Wind Speed'} />
                  <div className="text-2xl font-bold text-gray-800">{weatherData.current.wind_kph} km/h</div>
                  <div className="text-gray-600">{uiText.windSpeed}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Icon name="gauge" className="w-8 h-8 text-purple-500 mx-auto mb-2" title={language.code === 'hi' ? 'दबाव' : language.code === 'ml' ? 'മർദ്ദം' : language.code === 'te' ? 'పీడనం' : 'Pressure'} />
                  <div className="text-2xl font-bold text-gray-800">{weatherData.current.pressure_mb} mb</div>
                  <div className="text-gray-600">{uiText.pressure}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Icon name="eye" className="w-8 h-8 text-orange-500 mx-auto mb-2" title={language.code === 'hi' ? 'दृश्यता' : language.code === 'ml' ? 'കാഴ്ച' : language.code === 'te' ? 'దృశ్యమానత' : 'Visibility'} />
                  <div className="text-2xl font-bold text-gray-800">{weatherData.current.vis_km} km</div>
                  <div className="text-gray-600">{uiText.visibility}</div>
                </div>
              </div>

              {/* 3-Day Forecast */}
              {weatherData.forecast && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{uiText.threeDayForecast}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {weatherData.forecast.forecastday.map((day, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                        <div className="font-semibold text-gray-800 mb-2">
                          {index === 0 ? uiText.today : formatDateLocalized(day.date)}
                        </div>
                        <img 
                          src={`https:${day.day.condition.icon}`} 
                          alt={translateWeatherCondition(day.day.condition.text)}
                          className="w-12 h-12 mx-auto mb-2"
                        />
                        <div className="text-lg font-bold text-gray-800">
                          {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                        </div>
                        <div className="text-sm text-gray-600">{translateWeatherCondition(day.day.condition.text)}</div>
                        <div className="text-sm text-blue-600 mt-1">
                          <Icon name="waterDrop" className="w-4 h-4 inline mr-1" />
                          {day.day.chance_of_rain}% {uiText.rainChance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;