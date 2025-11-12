import React from 'react';
import LanguageSelector from './components/LanguageSelector';
import ChatWindow from './components/ChatWindow';
import { useAuth } from './hooks/useAuth';
import type { Language } from './types';

const LANGUAGE_STORAGE_KEY = 'krishi-mitra-language';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language | null>(() => {
    try {
      const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return savedLang ? JSON.parse(savedLang) : null;
    } catch (error) {
      console.error("Failed to parse language from localStorage", error);
      return null;
    }
  });

  const { currentUser, logout } = useAuth();

  React.useEffect(() => {
    try {
      if (selectedLanguage) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(selectedLanguage));
      } else {
        localStorage.removeItem(LANGUAGE_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleLanguageChangeRequest = () => {
    setSelectedLanguage(null);
  };

  const renderContent = () => {
    if (!selectedLanguage) {
      return <LanguageSelector onSelect={handleLanguageSelect} />;
    }
    // Always show ChatWindow, bypassing authentication
    return (
      <ChatWindow 
        language={selectedLanguage}
        user={currentUser || { username: 'Guest' }} // Provide a default user if none exists
        onLanguageChangeRequest={handleLanguageChangeRequest} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-4xl h-[95vh] max-h-[900px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -top-2 -right-6 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-purple-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default App;