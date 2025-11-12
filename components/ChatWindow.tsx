import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './Header';
import InputBar from './InputBar';
import ChatMessage from './ChatMessage';
import Spinner from './Spinner';
import MarketPrices from './MarketPrices';
import GovernmentSchemes from './GovernmentSchemes';
import CropCalendar from './CropCalendar';
import Helpline from './Helpline';
import Machinery from './Machinery';
import BudgetPlanner from './BudgetPlanner';
import CropInsurance from './CropInsurance';
import Weather from './Weather';
import ChatHistory from './ChatHistory';
import Toast from './ErrorToast';
import { sendMessage } from '../services/chatService'; // Import the new chat service
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import type { Language, Message, User, Conversation } from '../types';
import { MessageRole } from '../types';
import { UI_STRINGS } from '../constants';

interface ChatWindowProps {
  language: Language;
  user: User;
  onLanguageChangeRequest: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ language, user, onLanguageChangeRequest }) => {
  const conversationsKey = `conversations_${user.username}`;
  const voiceEnabledKey = `voice_enabled_${user.username}`;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoToast, setInfoToast] = useState<string | null>(null);

  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(voiceEnabledKey);
      return saved !== null ? JSON.parse(saved) : true; // Default to on
    } catch {
      return true;
    }
  });

  // Modal visibility states
  const [isMarketPricesVisible, setIsMarketPricesVisible] = useState(false);
  const [isSchemesVisible, setIsSchemesVisible] = useState(false);
  const [isCropCalendarVisible, setIsCropCalendarVisible] = useState(false);
  const [isHelplineVisible, setIsHelplineVisible] = useState(false);
  const [isMachineryVisible, setIsMachineryVisible] = useState(false);
  const [isBudgetPlannerVisible, setIsBudgetPlannerVisible] = useState(false);
  const [isCropInsuranceVisible, setIsCropInsuranceVisible] = useState(false);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const { speak } = useTextToSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleNewChat = useCallback(() => {
    const currentUiText = UI_STRINGS[language.code];
    const newConversation: Conversation = {
      id: `conv_${Date.now()}`,
      title: currentUiText.chatHistory.newChat,
      startTime: Date.now(),
      lastUpdateTime: Date.now(),
      messages: [{ id: 'initial', role: MessageRole.AI, text: currentUiText.welcomeMessage }],
    };
    setConversations(prev => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
    if (isVoiceEnabled) {
      speak(currentUiText.welcomeMessage, language.bcp47);
    }
  }, [language, isVoiceEnabled, speak]);

  // Load conversations from localStorage on initial render
  useEffect(() => {
    try {
      // Always start with a fresh conversation, ignoring saved history
      handleNewChat();
      
      // Clear any existing conversations from localStorage
      localStorage.removeItem(conversationsKey);
    } catch (err) {
      console.error("Failed to initialize conversations:", err);
      // Fallback to a new chat if loading fails
      handleNewChat();
    }
  }, [conversationsKey, handleNewChat, language.code]);
  
  // Save conversations to localStorage whenever they change or language changes
  useEffect(() => {
    if (conversations.length > 0) {
      try {
        // Update welcome messages to current language before saving
        const updatedConversations = conversations.map(conv => ({
          ...conv,
          messages: conv.messages.map(msg => {
            // Update initial AI welcome message to current language
            if (msg.id === 'initial' && msg.role === MessageRole.AI) {
              return {
                ...msg,
                text: UI_STRINGS[language.code].welcomeMessage
              };
            }
            return msg;
          })
        }));
        
        localStorage.setItem(conversationsKey, JSON.stringify(updatedConversations));
      } catch (error) {
        console.error("Failed to save conversations to localStorage", error);
      }
    }
  }, [conversations, conversationsKey, language.code]);
  
  // Save voice preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(voiceEnabledKey, JSON.stringify(isVoiceEnabled));
    } catch (error) {
      console.error("Failed to save voice preference", error);
    }
  }, [isVoiceEnabled, voiceEnabledKey]);

  // Effect to stop text-to-speech on component unmount or page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Stop any speech synthesis on page refresh or close
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function runs when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also stop speech synthesis on component unmount
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSendMessage = async (text: string, image?: string) => {
    if ((!text && !image) || !activeConversationId) return;

    const userMessage: Message = { id: Date.now().toString(), role: MessageRole.USER, text: text, image: image };

    // Update conversation state
    const updateConversations = (msg: Message) => {
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === activeConversationId) {
            const isFirstUserMessage = conv.messages.filter(m => m.role === MessageRole.USER).length === 0;
            return {
              ...conv,
              // Set title from first user message if it's a new chat
              title: isFirstUserMessage && text ? text.substring(0, 40) : conv.title,
              messages: [...conv.messages, msg],
              lastUpdateTime: Date.now(),
            };
          }
          return conv;
        })
      );
    };

    updateConversations(userMessage);
    setIsLoading(true);
    setError(null);

    try {
      // Use the backend service instead of local gemini service
      const response = await sendMessage(text, image);
      const aiMessage: Message = { 
        id: response.aiMessage.id, 
        role: MessageRole.AI, 
        text: response.aiMessage.text 
      };
      updateConversations(aiMessage);
      if (isVoiceEnabled) {
        speak(response.aiMessage.text, language.bcp47);
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : UI_STRINGS[language.code].error;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? { ...conv, messages: conv.messages.map(msg => msg.id === messageId ? { ...msg, feedback } : msg) }
          : conv
      )
    );
  };

  const handleLoadConversation = (id: string) => {
    setActiveConversationId(id);
    setIsHistoryVisible(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    // If the active conversation was deleted, load the most recent one or start a new chat
    if (activeConversationId === id) {
      const remainingConversations = conversations.filter(c => c.id !== id);
      if (remainingConversations.length > 0) {
        const sorted = [...remainingConversations].sort((a, b) => b.lastUpdateTime - a.lastUpdateTime);
        setActiveConversationId(sorted[0].id);
      } else {
        handleNewChat();
      }
    }
  };
  
  const handleToggleVoice = () => {
    const newVoiceState = !isVoiceEnabled;
    setIsVoiceEnabled(newVoiceState);
    const currentUiText = UI_STRINGS[language.code];
    if (!newVoiceState) { // If turning voice OFF
      window.speechSynthesis.cancel();
      setInfoToast(currentUiText.toast.voiceDisabled);
    } else { // If turning voice ON
      setInfoToast(currentUiText.toast.voiceEnabled);
      // Speak the last AI message to confirm voice is working
      if (activeConversation && activeConversation.messages.length > 0) {
        const lastMessage = activeConversation.messages[activeConversation.messages.length - 1];
        if (lastMessage.role === MessageRole.AI) {
          speak(lastMessage.text, language.bcp47);
        }
      }
    }
  };

  const handleLanguageChange = () => {
    window.speechSynthesis.cancel();
    onLanguageChangeRequest();
  };

  const currentUiText = UI_STRINGS[language.code];
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      <Header
        uiText={currentUiText}
        onMarketPricesClick={() => setIsMarketPricesVisible(true)}
        onGovernmentSchemesClick={() => setIsSchemesVisible(true)}
        onCropCalendarClick={() => setIsCropCalendarVisible(true)}
        onHelplineClick={() => setIsHelplineVisible(true)}
        onMachineryClick={() => setIsMachineryVisible(true)}
        onBudgetPlannerClick={() => setIsBudgetPlannerVisible(true)}
        onCropInsuranceClick={() => setIsCropInsuranceVisible(true)}
        onWeatherClick={() => setIsWeatherVisible(true)}
        onLanguageChangeClick={handleLanguageChange}
        onNewChatClick={handleNewChat}
        isVoiceEnabled={isVoiceEnabled}
        onToggleVoice={handleToggleVoice}
      />
      
      {error && <Toast message={error} onClose={() => setError(null)} type="error" />}
      {infoToast && <Toast message={infoToast} onClose={() => setInfoToast(null)} type="info" />}

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100">
        {activeConversation?.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} language={language} onFeedback={handleFeedback} isVoiceEnabled={isVoiceEnabled} />
        ))}
        {isLoading && (
          <div className="flex justify-center items-center space-x-4 py-8">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 font-medium text-lg">{currentUiText.listening}</p>
              <p className="text-gray-400 text-sm">AI is thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 bg-white/90 backdrop-blur-sm">
        <InputBar onSend={handleSendMessage} language={language} isLoading={isLoading} onHistoryClick={() => setIsHistoryVisible(true)} />
      </div>
      
      {isMarketPricesVisible && <MarketPrices onClose={() => setIsMarketPricesVisible(false)} language={language} />}
      {isSchemesVisible && <GovernmentSchemes onClose={() => setIsSchemesVisible(false)} language={language} />}
      {isCropCalendarVisible && <CropCalendar onClose={() => setIsCropCalendarVisible(false)} language={language} />}
      {isHelplineVisible && <Helpline onClose={() => setIsHelplineVisible(false)} language={language} />}
      {isMachineryVisible && <Machinery onClose={() => setIsMachineryVisible(false)} language={language} />}
      {isBudgetPlannerVisible && <BudgetPlanner onClose={() => setIsBudgetPlannerVisible(false)} language={language} />}
      {isCropInsuranceVisible && <CropInsurance onClose={() => setIsCropInsuranceVisible(false)} language={language} />}
      {isWeatherVisible && <Weather onClose={() => setIsWeatherVisible(false)} language={language} />}
      {isHistoryVisible && (
        <ChatHistory
          conversations={conversations}
          onLoadConversation={handleLoadConversation}
          onDeleteConversation={handleDeleteConversation}
          onClose={() => setIsHistoryVisible(false)}
          language={language}
        />
      )}
    </div>
  );
};

export default ChatWindow;