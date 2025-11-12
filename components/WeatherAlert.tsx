import React from 'react';
import { Icon } from './Icon';
import type { Language, WeatherAlert as WeatherAlertType } from '../types';
import { UI_STRINGS } from '../constants';

interface WeatherAlertProps {
  alert: WeatherAlertType;
  language: Language;
  onDismiss: () => void;
}

const WeatherAlert: React.FC<WeatherAlertProps> = ({ alert, language, onDismiss }) => {
  const uiText = UI_STRINGS[language.code].weatherAlerts;
  const langCode = language.code;

  return (
    <div className="bg-yellow-100 border-b-4 border-yellow-500 text-yellow-800 p-4 flex items-center justify-between animate-fade-in-down">
      <div className="flex items-center">
        <Icon name="alert" className="w-6 h-6 mr-3 flex-shrink-0" />
        <div>
          <p className="font-bold">{uiText.title}</p>
          <p className="text-sm">{alert.message[langCode]}</p>
        </div>
      </div>
      <button onClick={onDismiss} className="text-yellow-900 hover:bg-yellow-200 p-1 rounded-full">
        <Icon name="close" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WeatherAlert;
