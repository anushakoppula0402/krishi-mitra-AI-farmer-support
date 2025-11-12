import React, { useState } from 'react';
import { marketPricesData } from '../data/marketPrices';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface MarketPricesProps {
  onClose: () => void;
  language: Language;
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  switch (trend) {
    case 'up':
      return <Icon name="trendUp" className="w-5 h-5 text-green-600" />;
    case 'down':
      return <Icon name="trendDown" className="w-5 h-5 text-red-600" />;
    default:
      return <Icon name="trendStable" className="w-5 h-5 text-gray-500" />;
  }
};

const MarketPrices: React.FC<MarketPricesProps> = ({ onClose, language }) => {
  const [selectedRegion, setSelectedRegion] = useState(marketPricesData[0].nameKey);
  const uiText = UI_STRINGS[language.code].marketPrices;

  const selectedRegionData = marketPricesData.find(r => r.nameKey === selectedRegion);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{uiText.selectRegion}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {marketPricesData.map((region) => (
                <button
                  key={region.nameKey}
                  onClick={() => setSelectedRegion(region.nameKey)}
                  className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${
                    selectedRegion === region.nameKey
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-gray-200 text-gray-800 hover:bg-green-200'
                  }`}
                >
                  {uiText.regions[region.nameKey]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 px-4 py-2 font-bold text-gray-600 bg-gray-100 rounded-t-lg">
              <span>{uiText.crop}</span>
              <span className="text-right">{uiText.price}</span>
              <span className="text-right">{uiText.trend}</span>
            </div>
            {selectedRegionData?.crops.map((crop) => (
              <div key={crop.name} className="grid grid-cols-3 gap-4 p-4 bg-white border rounded-lg shadow-sm items-center">
                <span className="font-semibold text-gray-800">{crop.name}</span>
                <span className="text-right text-lg font-mono text-gray-900">
                  ₹{crop.price.toLocaleString('en-IN')}
                </span>
                <div className="flex justify-end">
                    <TrendIcon trend={crop.trend} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketPrices;