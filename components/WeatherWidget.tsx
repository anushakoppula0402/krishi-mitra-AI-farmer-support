import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherService';
import type { Language, WeatherData } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';
import Spinner from './Spinner';

interface WeatherWidgetProps {
  onClose: () => void;
  language: Language;
}

const DetailRow: React.FC<{ iconName: string; label: string; value: string }> = ({ iconName, label, value }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center gap-3 text-gray-600">
      <Icon name={iconName} className="w-5 h-5" />
      <span>{label}</span>
    </div>
    <span className="font-bold text-gray-800 text-right">{value}</span>
  </div>
);

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onClose, language }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('New Delhi');
  const [searchInput, setSearchInput] = useState('New Delhi');
  
  const uiText = UI_STRINGS[language.code].weatherWidget;

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'CITY_NOT_FOUND') {
                setError(uiText.cityNotFound);
            } else if (err.message === 'SERVICE_UNAVAILABLE') {
                setError(uiText.serviceUnavailable);
            } else {
                setError(uiText.fetchError);
            }
        } else {
             setError(uiText.fetchError);
        }
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (city) {
      fetchWeather();
    }
  }, [city, uiText]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={uiText.searchPlaceholder}
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-green-300"
              disabled={isLoading}
            >
              <Icon name="search" className="w-6 h-6" />
            </button>
          </form>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">
              <p>{error}</p>
            </div>
          ) : weatherData ? (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800">{weatherData.city}</h3>
               <img 
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} 
                alt={weatherData.description}
                className="mx-auto w-32 h-32 -my-2"
              />
              <p className="text-7xl font-bold text-gray-900">{weatherData.temperature.toFixed(1)}°C</p>
              <p className="text-lg text-gray-600 capitalize -mt-1">{weatherData.description}</p>
              
              <div className="w-full text-left mt-6 bg-gray-50 p-4 rounded-lg">
                <DetailRow iconName="temperature" label={uiText.feelsLike} value={`${weatherData.feelsLike.toFixed(1)}°C`} />
                <DetailRow iconName="waterDrop" label={uiText.humidity} value={`${weatherData.humidity}%`} />
                <DetailRow iconName="wind" label={uiText.windSpeed} value={`${weatherData.windSpeed} m/s ${weatherData.windDirection}`} />
                <DetailRow iconName="gauge" label={uiText.pressure} value={`${weatherData.pressure} hPa`} />
                <DetailRow iconName="eye" label={uiText.visibility} value={`${weatherData.visibility.toFixed(1)} km`} />
                <DetailRow iconName="sunrise" label={uiText.sunrise} value={weatherData.sunrise} />
                <DetailRow iconName="sunset" label={uiText.sunset} value={weatherData.sunset} />
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default WeatherWidget;