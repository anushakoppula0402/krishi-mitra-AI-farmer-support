import React, { useState } from 'react';
import { machineryData } from '../data/machineryData';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface MachineryProps {
  onClose: () => void;
  language: Language;
}

const Machinery: React.FC<MachineryProps> = ({ onClose, language }) => {
  const [activeCategory, setActiveCategory] = useState<string>(machineryData.length > 0 ? machineryData[0].id : '');
  const uiText = UI_STRINGS[language.code].machinery;
  const langCode = language.code;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar for categories */}
            <aside className="w-full lg:w-1/4">
              <nav className="space-y-3">
                {machineryData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-4 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md transform scale-[1.02]'
                        : 'bg-white text-gray-800 hover:bg-green-100 hover:border-green-300 border border-gray-200'
                    }`}
                  >
                    {category.name[langCode]}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content area for machinery */}
            <section className="w-full lg:w-3/4">
              <div className="grid gap-8">
                {machineryData
                  .find(cat => cat.id === activeCategory)
                  ?.machinery.map((item) => (
                    <div key={item.name.en} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <img 
                        src={item.image} 
                        alt={item.name[langCode]} 
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop&crop=center';
                        }}
                      />
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-green-800 mb-3">{item.name[langCode]}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{item.description[langCode]}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                                <h4 className="font-semibold text-blue-800 mb-2">{uiText.cost}</h4>
                                <p className="text-2xl font-bold text-blue-900">{formatCurrency(item.cost)}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
                                <h4 className="font-semibold text-green-800 mb-2">{uiText.subsidy}</h4>
                                <p className="text-sm text-green-900 leading-relaxed">{item.subsidy.details[langCode]}</p>
                            </div>
                        </div>

                        <a 
                           href={item.link} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                           {uiText.learnMore} <span className="text-lg">→</span>
                        </a>
                      </div>
                    </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Machinery;