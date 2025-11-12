import type { WeatherData } from '../types';

// The OpenWeatherMap API key must be set as an environment variable.
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const degreesToCardinal = (deg: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

const formatTime = (timestamp: number, timezoneOffset: number): string => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true });
};

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    console.error("OpenWeatherMap API key (OPEN_WEATHER_API_KEY) is not configured in the environment.");
    throw new Error('SERVICE_UNAVAILABLE');
  }

  try {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
        if (response.status === 401) {
            console.error("OpenWeatherMap API key is invalid or has been blocked.");
            throw new Error('SERVICE_UNAVAILABLE');
        }
        if (response.status === 404) {
            throw new Error('CITY_NOT_FOUND');
        }
      throw new Error('FETCH_FAILED');
    }

    const data = await response.json();

    return {
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDirection: degreesToCardinal(data.wind.deg || 0),
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert meters to kilometers
      sunrise: formatTime(data.sys.sunrise, data.timezone),
      sunset: formatTime(data.sys.sunset, data.timezone),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error("Weather service error:", error);
    if (error instanceof Error && ['SERVICE_UNAVAILABLE', 'CITY_NOT_FOUND', 'FETCH_FAILED'].includes(error.message)) {
      throw error; // Re-throw custom errors
    }
    throw new Error('FETCH_FAILED'); // Throw a generic error for other issues like network problems
  }
};