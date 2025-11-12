import React, { useState, useEffect } from 'react';
import { cropCalendarData } from '../data/cropCalendar';
import type { Language, CropCalendar as CropCalendarType } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface CropCalendarProps {
  onClose: () => void;
  language: Language;
}

type Season = 'All' | 'Kharif' | 'Rabi';

const CropCalendar: React.FC<CropCalendarProps> = ({ onClose, language }) => {
  const [selectedSeason, setSelectedSeason] = useState<Season>('All');
  const [filteredCrops, setFilteredCrops] = useState<CropCalendarType[]>(cropCalendarData);
  const [selectedCropId, setSelectedCropId] = useState<number | null>(cropCalendarData.length > 0 ? cropCalendarData[0].id : null);
  
  const uiText = UI_STRINGS[language.code].cropCalendar;
  const langCode = language.code;

  useEffect(() => {
    const newFilteredCrops = cropCalendarData.filter(crop =>
      selectedSeason === 'All' || crop.season === selectedSeason
    );
    setFilteredCrops(newFilteredCrops);

    const isSelectedCropInFilteredList = newFilteredCrops.some(c => c.id === selectedCropId);
    if (!isSelectedCropInFilteredList) {
      setSelectedCropId(newFilteredCrops.length > 0 ? newFilteredCrops[0].id : null);
    }
  }, [selectedSeason, selectedCropId]);

  const selectedCropData = cropCalendarData.find(c => c.id === selectedCropId);
  const seasons: Season[] = ['All', 'Kharif', 'Rabi'];

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
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{uiText.filterBySeason}</h3>
            <div className="grid grid-cols-3 gap-3">
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`p-3 rounded-lg font-semibold transition-colors duration-200 ${
                    selectedSeason === season
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-gray-200 text-gray-800 hover:bg-green-200'
                  }`}
                >
                  {uiText[season.toLowerCase() as keyof typeof uiText]}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{uiText.selectCrop}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredCrops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`p-3 rounded-lg font-semibold transition-colors duration-200 text-center ${
                    selectedCropId === crop.id
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-gray-200 text-gray-800 hover:bg-green-200'
                  }`}
                >
                  {crop.cropName[langCode]}
                </button>
              ))}
            </div>
          </div>

          {selectedCropData ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 px-4 py-2 font-bold text-gray-600 bg-gray-100 rounded-t-lg">
                <span>{uiText.stage}</span>
                <span className="text-right">{uiText.timing}</span>
              </div>
              {selectedCropData.stages.map((stage) => (
                <div key={stage.name.en} className="grid grid-cols-2 gap-4 p-4 bg-white border rounded-lg shadow-sm items-center">
                  <span className="font-semibold text-gray-800">{stage.name[langCode]}</span>
                  <span className="text-right text-gray-700">
                    {stage.timing[langCode]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No crops to display for the selected season.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CropCalendar;