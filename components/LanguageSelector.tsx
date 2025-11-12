import React from 'react';
import { LANGUAGES, UI_STRINGS } from '../constants';
import type { Language } from '../types';

interface LanguageSelectorProps {
  onSelect: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-green-100 to-yellow-100">
      <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">
        Krishi Mitra
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
        Select Your Language / अपनी भाषा चुनें / നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക / మీ భాషను ఎంచుకోండి
      </h2>
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang)}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-green-100 transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-green-200 focus:outline-none focus:ring-4 focus:ring-green-300 active:scale-95"
          >
            <span className="text-xl font-bold text-green-700">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;