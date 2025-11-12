import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  uiText: any;
  onMarketPricesClick: () => void;
  onGovernmentSchemesClick: () => void;
  onCropCalendarClick: () => void;
  onHelplineClick: () => void;
  onMachineryClick: () => void;
  onBudgetPlannerClick: () => void;
  onCropInsuranceClick: () => void;
  onWeatherClick: () => void;
  onLanguageChangeClick: () => void;
  // Removed onLogout since we're not using authentication
  onNewChatClick: () => void;
  isVoiceEnabled: boolean;
  onToggleVoice: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  uiText,
  onMarketPricesClick, 
  onGovernmentSchemesClick, 
  onCropCalendarClick, 
  onHelplineClick, 
  onMachineryClick, 
  onBudgetPlannerClick,
  onCropInsuranceClick,
  onWeatherClick,
  onLanguageChangeClick,
  // Removed onLogout
  onNewChatClick,
  isVoiceEnabled,
  onToggleVoice,
}) => {
  return (
    <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white p-4 shadow-xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button
            onClick={onLanguageChangeClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.changeLanguage}
          >
            <Icon name="globe" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.changeLanguage} />
          </button>
          {/* Removed logout button */}
          <button
            onClick={onToggleVoice}
            className={`p-2.5 rounded-xl transition-all duration-200 active:scale-95 group ${
              isVoiceEnabled ? 'bg-white/20' : 'hover:bg-white/20'
            }`}
            aria-label={isVoiceEnabled ? uiText.header.toggleVoiceOff : uiText.header.toggleVoiceOn}
          >
            <Icon name={isVoiceEnabled ? 'volumeUp' : 'volumeOff'} className="w-6 h-6 group-hover:scale-110 transition-transform" title={isVoiceEnabled ? uiText.header.toggleVoiceOff : uiText.header.toggleVoiceOn} />
          </button>
        </div>

        {/* Center section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">🌾</span>
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-center bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            {uiText.appTitle}
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          <button
            onClick={onNewChatClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.newChat}
          >
            <Icon name="plus" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.newChat} />
          </button>
          <button
            onClick={onBudgetPlannerClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.budgetPlanner}
          >
            <Icon name="currencyRupee" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.budgetPlanner} />
          </button>
          <button
            onClick={onCropInsuranceClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.cropInsurance}
          >
            <Icon name="shield" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.cropInsurance} />
          </button>
          <button
            onClick={onWeatherClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.weather}
          >
            <Icon name="waterDrop" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.weather} />
          </button>
          <button
            onClick={onMachineryClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.machinery}
          >
            <Icon name="tractor" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.machinery} />
          </button>
          <button
            onClick={onHelplineClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.helpline}
          >
            <Icon name="helpline" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.helpline} />
          </button>
          <button
            onClick={onCropCalendarClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.cropCalendar}
          >
            <Icon name="calendar" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.cropCalendar} />
          </button>
          <button
            onClick={onGovernmentSchemesClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.governmentSchemes}
          >
            <Icon name="schemes" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.governmentSchemes} />
          </button>
          <button
            onClick={onMarketPricesClick}
            className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95 group"
            aria-label={uiText.header.marketPrices}
          >
            <Icon name="market" className="w-6 h-6 group-hover:scale-110 transition-transform" title={uiText.header.marketPrices} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;