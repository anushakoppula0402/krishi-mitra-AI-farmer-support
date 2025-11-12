import React, { useState } from 'react';
import { governmentSchemesData } from '../data/governmentSchemes';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface GovernmentSchemesProps {
  onClose: () => void;
  language: Language;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ onClose, language }) => {
  const [openSchemeId, setOpenSchemeId] = useState<number | null>(null);
  const uiText = UI_STRINGS[language.code].governmentSchemes;
  const langCode = language.code;

  const handleToggle = (id: number) => {
    setOpenSchemeId(openSchemeId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {governmentSchemesData.map((scheme) => (
              <div key={scheme.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => handleToggle(scheme.id)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-green-50"
                >
                  <span className="text-lg">{scheme.name[langCode]}</span>
                  <Icon
                    name="chevronDown"
                    className={`w-6 h-6 transition-transform ${openSchemeId === scheme.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSchemeId === scheme.id && (
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <p className="text-gray-600 mb-4">{scheme.description[langCode]}</p>
                    
                    <h3 className="font-bold text-md text-green-700 mb-2">{uiText.eligibility}</h3>
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">{scheme.eligibility[langCode]}</p>

                    <h3 className="font-bold text-md text-green-700 mb-2">{uiText.benefits}</h3>
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">{scheme.benefits[langCode]}</p>

                    <h3 className="font-bold text-md text-green-700 mb-2">{uiText.applicationProcess}</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{scheme.applicationProcess[langCode]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GovernmentSchemes;