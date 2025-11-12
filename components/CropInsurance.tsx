import React, { useState } from 'react';
import { cropInsuranceData } from '../data/cropInsurance';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface CropInsuranceProps {
  onClose: () => void;
  language: Language;
}

const CropInsurance: React.FC<CropInsuranceProps> = ({ onClose, language }) => {
  const [activeScheme, setActiveScheme] = useState<number>(cropInsuranceData.length > 0 ? cropInsuranceData[0].id : 1);
  const uiText = UI_STRINGS[language.code].cropInsurance;
  const langCode = language.code;

  const currentScheme = cropInsuranceData.find(scheme => scheme.id === activeScheme);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" title="Close" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar for scheme selection */}
            <aside className="w-full lg:w-1/3">
              <nav className="space-y-2">
                {cropInsuranceData.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => setActiveScheme(scheme.id)}
                    className={`w-full text-left p-4 rounded-lg font-semibold transition-colors duration-200 ${
                      activeScheme === scheme.id
                        ? 'bg-green-600 text-white shadow'
                        : 'bg-white text-gray-800 hover:bg-green-100'
                    }`}
                  >
                    <div className="text-sm font-medium">{scheme.name[langCode]}</div>
                    <div className="text-xs opacity-80 mt-1 line-clamp-2">{scheme.description[langCode]}</div>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content area for scheme details */}
            <section className="w-full lg:w-2/3">
              {currentScheme && (
                <div className="space-y-6">
                  {/* Scheme Basic Info */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-green-800 mb-3">{currentScheme.name[langCode]}</h3>
                      <p className="text-gray-600 mb-4">{currentScheme.description[langCode]}</p>
                      
                      {/* Contact Information */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="helpline" className="w-4 h-4 text-green-600" title="Contact Phone" />
                          <span className="font-semibold text-green-800">{currentScheme.contactInfo.phone}</span>
                        </div>
                        <a 
                          href={currentScheme.contactInfo.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Icon name="globe" className="w-4 h-4" title="Visit Website" />
                          <span>{uiText.visitWebsite}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Scheme Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coverage */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Icon name="shield" className="w-5 h-5" title="Coverage Details" />
                        {uiText.coverage}
                      </h4>
                      <p className="text-gray-700">{currentScheme.coverage[langCode]}</p>
                    </div>

                    {/* Premium */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Icon name="currencyRupee" className="w-5 h-5" title="Premium Information" />
                        {uiText.premium}
                      </h4>
                      <p className="text-gray-700">{currentScheme.premium[langCode]}</p>
                    </div>

                    {/* Eligibility */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Icon name="user" className="w-5 h-5" title="Eligibility Criteria" />
                        {uiText.eligibility}
                      </h4>
                      <p className="text-gray-700">{currentScheme.eligibility[langCode]}</p>
                    </div>

                    {/* Claim Process */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Icon name="document" className="w-5 h-5" title="Claim Process" />
                        {uiText.claimProcess}
                      </h4>
                      <p className="text-gray-700">{currentScheme.claimProcess[langCode]}</p>
                    </div>
                  </div>

                  {/* Documents Required */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <Icon name="folder" className="w-5 h-5" title="Required Documents" />
                      {uiText.documentsRequired}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentScheme.documents.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <Icon name="check" className="w-4 h-4 text-green-600" title="Required" />
                          {doc[langCode]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <Icon name="star" className="w-5 h-5" title="Key Benefits" />
                      {uiText.keyBenefits}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentScheme.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <Icon name="thumbUp" className="w-4 h-4 text-green-600" title="Benefit" />
                          {benefit[langCode]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CropInsurance;