import React, { useState, useMemo } from 'react';
import { budgetData } from '../data/budgetData';
import type { Language, CropBudget } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface BudgetPlannerProps {
  onClose: () => void;
  language: Language;
}

const BudgetPlanner: React.FC<BudgetPlannerProps> = ({ onClose, language }) => {
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const uiText = UI_STRINGS[language.code].budgetPlanner;
  const langCode = language.code;

  // Filter crops based on search term
  const filteredCrops = useMemo(() => {
    if (!searchTerm) return budgetData;
    
    const search = searchTerm.toLowerCase();
    return budgetData.filter(crop => 
      crop.cropName.en.toLowerCase().includes(search) ||
      crop.cropName.hi.toLowerCase().includes(search) ||
      crop.cropName.ml.toLowerCase().includes(search) ||
      crop.cropName.te.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  const selectedCropData = useMemo(() => {
    return budgetData.find(c => c.id === selectedCropId) || null;
  }, [selectedCropId]);

  const calculations = useMemo(() => {
    if (!selectedCropData) return null;
    const totalExpenditure = selectedCropData.expenditure.reduce((acc, item) => acc + item.cost, 0);
    const totalIncome = selectedCropData.estimatedYield.amount * selectedCropData.estimatedPrice;
    const netProfit = totalIncome - totalExpenditure;
    return { totalExpenditure, totalIncome, netProfit };
  }, [selectedCropData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const handleCropSelection = (cropId: number) => {
    setSelectedCropId(cropId);
    setSearchTerm(''); // Clear search when crop is selected
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto bg-gray-50">
          {!selectedCropData ? (
            <div className="space-y-6">
              {/* Search Section */}
              <div className="mb-6">
                <label htmlFor="crop-search" className="block text-lg font-semibold text-gray-700 mb-2">
                  {language.code === 'hi' ? 'फसलों की खोज करें' : language.code === 'ml' ? 'വിളകൾ തിരയുക' : language.code === 'te' ? 'పంటలను వెతకండి' : 'Search for Crops'}
                </label>
                <div className="relative">
                  <input
                    id="crop-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={language.code === 'hi' ? 'खोजने के लिए फसल का नाम टाइप करें...' : language.code === 'ml' ? 'വിള പേര് ടൈപ്പ് ചെയ്യുക...' : language.code === 'te' ? 'పంట పేరు టైప్ చేయండి...' : 'Type crop name to search...'}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Crop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCrops.map(crop => {
                  const totalCost = crop.expenditure.reduce((sum, item) => sum + item.cost, 0);
                  const totalIncome = crop.estimatedYield.amount * crop.estimatedPrice;
                  const profit = totalIncome - totalCost;
                  const profitMargin = ((profit / totalIncome) * 100).toFixed(1);
                  
                  return (
                    <div
                      key={crop.id}
                      onClick={() => handleCropSelection(crop.id)}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md cursor-pointer transition-all duration-200"
                    >
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{crop.cropName[langCode]}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language.code === 'hi' ? 'लागत:' : language.code === 'ml' ? 'ചെലവ്:' : language.code === 'te' ? 'వ్యయం:' : 'Cost:'}</span>
                          <span className="font-mono font-semibold text-red-600">{formatCurrency(totalCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language.code === 'hi' ? 'आय:' : language.code === 'ml' ? 'വരുമാനം:' : language.code === 'te' ? 'ఆదాయం:' : 'Income:'}</span>
                          <span className="font-mono font-semibold text-green-600">{formatCurrency(totalIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language.code === 'hi' ? 'लाभ:' : language.code === 'ml' ? 'ലാഭം:' : language.code === 'te' ? 'లాభం:' : 'Profit:'}</span>
                          <span className={`font-mono font-bold ${
                            profit >= 0 ? 'text-blue-600' : 'text-orange-600'
                          }`}>{formatCurrency(profit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language.code === 'hi' ? 'मार्जिन:' : language.code === 'ml' ? 'മാർജിൻ:' : language.code === 'te' ? 'మార్జిన్:' : 'Margin:'}</span>
                          <span className={`font-semibold ${
                            parseFloat(profitMargin) >= 0 ? 'text-blue-600' : 'text-orange-600'
                          }`}>{profitMargin}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language.code === 'hi' ? 'उपज:' : language.code === 'ml' ? 'വിളവ്:' : language.code === 'te' ? 'దిగుబడి:' : 'Yield:'}</span>
                          <span className="text-gray-800">{crop.estimatedYield.amount} {crop.estimatedYield.unit[langCode]}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredCrops.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <Icon name="search" className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">{language.code === 'hi' ? `"${searchTerm}" से मेल खाने वाली कोई फसल नहीं मिली` : language.code === 'ml' ? `"${searchTerm}" നുമായി പൊരുത്തപ്പെടുന്ന വിളകളൊന്നും കണ്ടെത്തിയില്ല` : language.code === 'te' ? `"${searchTerm}" తో సరిపోయే పంటలు కనుగొనబడలేదు` : `No crops found matching "${searchTerm}"`}</p>
                  <p className="text-sm">{language.code === 'hi' ? 'एक अलग शब्द के साथ खोजने का प्रयास करें' : language.code === 'ml' ? 'വേറൊരു പദം ഉപയോഗിച്ച് തിരയാൻ ശ്രമിക്കുക' : language.code === 'te' ? 'వేరే పదంతో వెతకడానికి ప్రయత్నించండి' : 'Try searching with a different term'}</p>
                </div>
              )}

              {!searchTerm && (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-lg">{language.code === 'hi' ? `${budgetData.length} फसलों को ब्राउज़ करें या ऊपर खोज का उपयोग करें` : language.code === 'ml' ? `${budgetData.length} വിളകൾ ബ്രൗസ് ചെയ്യുക അല്ലെങ്കിൽ മുകളിൽ തിരയുക` : language.code === 'te' ? `${budgetData.length} పంటలను బ్రౌజ్ చేయండి లేదా పైన వెతకండి` : `Browse ${budgetData.length} crops or use the search above`}</p>
                  <p className="text-sm">{language.code === 'hi' ? 'विस्तृत बजट विश्लेषण देखने के लिए किसी भी फसल कार्ड पर क्लिक करें' : language.code === 'ml' ? 'വിശദമായ ബജറ്റ് വിശകലനം കാണാൻ ഏതെങ്കിലും വിള കാർഡിൽ ക്ലിക്ക് ചെയ്യുക' : language.code === 'te' ? 'వివరణాత్మక బడ్జెట్ విశ్లేషణ చూడటానికి ఏదైనా పంట కార్డ్‌పై క్లిక్ చేయండి' : 'Click on any crop card to view detailed budget analysis'}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={() => setSelectedCropId(null)}
                className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium"
              >
                <Icon name="arrowLeft" className="w-5 h-5" />
                {language.code === 'hi' ? 'फसल चयन पर वापस जाएं' : language.code === 'ml' ? 'വിള തിരഞ്ഞെടുപ്പിലേക്ക് മടങ്ങുക' : language.code === 'te' ? 'పంట ఎంపికకు తిరిగి వెళ్లండి' : 'Back to Crop Selection'}
              </button>

              {/* Summary Section */}
              <div className="p-5 border rounded-lg bg-white shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-4">{uiText.estimatedIncome} vs {uiText.expenditure}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                          <span className="text-green-600 font-semibold">{uiText.totalIncome}</span>
                          <span className="font-mono text-lg font-bold text-green-600">{formatCurrency(calculations.totalIncome)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                          <div className="bg-green-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-red-600 font-semibold">{uiText.totalExpenditure}</span>
                          <span className="font-mono text-lg font-bold text-red-600">{formatCurrency(calculations.totalExpenditure)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                          <div className="bg-red-500 h-4 rounded-full" style={{ width: `${(calculations.totalExpenditure / calculations.totalIncome) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className={`p-6 rounded-lg text-center ${calculations.netProfit >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                    <h3 className={`text-xl font-bold ${calculations.netProfit >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>{uiText.netProfit}</h3>
                    <p className="text-4xl font-bold font-mono mt-2">{formatCurrency(calculations.netProfit)}</p>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Expenditure Details */}
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{uiText.expenditure}</h3>
                   <div className="space-y-2">
                    {selectedCropData.expenditure.map(item => (
                      <div key={item.item.en} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                        <div className="flex items-center gap-3">
                           <Icon name={item.icon} className="w-6 h-6 text-gray-500" />
                           <span className="text-gray-800">{item.item[langCode]}</span>
                        </div>
                        <span className="font-mono text-gray-900">{formatCurrency(item.cost)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Income Details */}
                 <div className="p-4 border rounded-lg bg-white">
                   <h3 className="text-xl font-bold text-gray-800 mb-3">{uiText.estimatedIncome}</h3>
                   <div className="space-y-3">
                      <div className="flex justify-between p-2">
                        <span className="text-gray-700">{uiText.estimatedYield}</span>
                        <span className="font-semibold text-gray-900">{selectedCropData.estimatedYield.amount} {selectedCropData.estimatedYield.unit[langCode]}</span>
                      </div>
                      <div className="flex justify-between p-2">
                        <span className="text-gray-700">{uiText.marketPrice}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(selectedCropData.estimatedPrice)} / {selectedCropData.estimatedYield.unit[langCode]}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BudgetPlanner;