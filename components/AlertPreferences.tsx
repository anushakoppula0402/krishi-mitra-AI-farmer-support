import React from 'react';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';
import { alertTypes } from '../data/weatherAlerts';

interface AlertPreferencesProps {
  onClose: () => void;
  language: Language;
  preferences: { [key: string]: boolean };
  onPreferencesChange: (newPreferences: { [key: string]: boolean }) => void;
}

const AlertPreferences: React.FC<AlertPreferencesProps> = ({ onClose, language, preferences, onPreferencesChange }) => {
  const uiText = UI_STRINGS[language.code].weatherAlerts;

  const handleToggle = (alertType: string) => {
    onPreferencesChange({
      ...preferences,
      [alertType]: !preferences[alertType],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.preferencesTitle}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{uiText.enableAlerts}</h3>
          <div className="space-y-3">
            {alertTypes.map((type) => (
              <label key={type} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer">
                <span className="font-semibold text-gray-800">{uiText[type as keyof typeof uiText]}</span>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences[type]}
                    onChange={() => handleToggle(type)}
                    className="absolute w-0 h-0 opacity-0"
                  />
                  <span className={`block w-12 h-6 rounded-full transition-colors ${preferences[type] ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences[type] ? 'transform translate-x-6' : ''}`}></span>
                </div>
              </label>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlertPreferences;