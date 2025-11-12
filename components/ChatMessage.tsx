import React from 'react';
import { MessageRole } from '../types';
import type { Language, Message } from '../types';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { Icon } from './Icon';

interface ChatMessageProps {
  message: Message;
  language: Language;
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void;
  isVoiceEnabled: boolean;
}

// Enhanced function to format AI responses with proper headings and formatting
const formatAIResponse = (text: string) => {
  return text.split('\n\n').map((paragraph, index) => {
    // Convert **text** to bold (double asterisks)
    let formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *text* to bold for single asterisks used as emphasis
    formattedParagraph = formattedParagraph.replace(/(?<!\*)\*((?!\*)[^*]+?)\*(?!\*)/g, '<strong>$1</strong>');
    
    // Handle numbered lists (1. 2. 3. etc.)
    if (/^\d+\./.test(formattedParagraph.trim())) {
      return (
        <div key={index} className="mb-3 flex items-start">
          <span className="text-green-600 font-semibold mr-2 mt-0.5">{formattedParagraph.match(/^\d+\./)?.[0]}</span>
          <div className="text-gray-800 flex-1" dangerouslySetInnerHTML={{__html: formattedParagraph.replace(/^\d+\.\s*/, '')}} />
        </div>
      );
    }
    
    // Handle bullet points (- or •)
    if (/^[-•]/.test(formattedParagraph.trim())) {
      return (
        <div key={index} className="mb-2 flex items-start">
          <span className="text-green-600 mr-3 mt-1 font-bold">•</span>
          <div className="text-gray-800 flex-1" dangerouslySetInnerHTML={{__html: formattedParagraph.replace(/^[-•]\s*/, '')}} />
        </div>
      );
    }
    
    // Handle main headings (all caps or title case ending with :)
    if (/^[A-Z][A-Z\s]*:$/.test(formattedParagraph.trim()) || 
        (/^[A-Z][^:]*:$/.test(formattedParagraph.trim()) && formattedParagraph.length < 50)) {
      return (
        <h2 key={index} className="text-xl font-bold text-green-900 mb-3 mt-5 border-b-2 border-green-200 pb-1">
          {formattedParagraph.replace(':', '')}
        </h2>
      );
    }
    
    // Handle subheadings (sentences ending with : that are shorter)
    if (formattedParagraph.trim().endsWith(':') && formattedParagraph.length < 100) {
      return (
        <h3 key={index} className="text-lg font-semibold text-green-800 mb-2 mt-4">
          {formattedParagraph.replace(':', '')}
        </h3>
      );
    }
    
    // Handle questions (ending with ?)
    if (formattedParagraph.trim().endsWith('?')) {
      return (
        <div key={index} className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r">
          <p className="text-blue-800 font-medium" dangerouslySetInnerHTML={{__html: formattedParagraph}} />
        </div>
      );
    }
    
    // Regular paragraphs
    return (
      <p key={index} className="mb-3 last:mb-0 text-gray-700 leading-relaxed">
        {formattedParagraph.split('\n').map((line, lineIndex) => (
          <span key={lineIndex}>
            <span dangerouslySetInnerHTML={{__html: line}} />
            {lineIndex < formattedParagraph.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, language, onFeedback, isVoiceEnabled }) => {
  const { speak } = useTextToSpeech();
  const isUser = message.role === MessageRole.USER;

  const handleReplayAudio = () => {
    speak(message.text, language.bcp47);
  };
  
  const handleFeedback = (type: 'up' | 'down') => {
      if (message.feedback) return; // Feedback already given
      onFeedback(message.id, type);
  }

  // Function to determine if the message contains an image or document
  const isImageMessage = message.image && message.image.startsWith('data:image');
  const isDocumentMessage = message.image && !message.image.startsWith('data:image');

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end animate-slide-in-fade-in-user' : 'justify-start animate-slide-in-fade-in'}`}>
      {!isUser && (
         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 ring-4 ring-green-100">
          🌱
        </div>
      )}
      <div className="flex flex-col max-w-md lg:max-w-lg">
        <div
          className={`p-6 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-lg relative'
              : 'bg-white text-gray-800 rounded-bl-lg border border-gray-100 relative'
          }`}
        >
          {/* Message tail */}
          <div className={`absolute bottom-0 ${
            isUser 
              ? 'right-[-8px] border-l-[16px] border-l-blue-500 border-b-[16px] border-b-transparent'
              : 'left-[-8px] border-r-[16px] border-r-white border-b-[16px] border-b-transparent'
          }`}></div>
          
          {message.image && (
            <div className="mb-4">
              {isImageMessage ? (
                <img
                  src={message.image}
                  alt="User upload"
                  className="rounded-xl max-h-60 w-auto shadow-md"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <Icon name="document" className="w-8 h-8 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">Document Attached</p>
                    <p className="text-sm text-gray-500">File uploaded by user</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Enhanced text formatting for AI responses */}
          {!isUser ? (
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-3">
                {formatAIResponse(message.text)}
              </div>
            </div>
          ) : (
            <p className="leading-relaxed">{message.text}</p>
          )}
        </div>
        
        {/* AI Message Controls */}
        {!isUser && (
          <div className="flex items-center justify-between mt-3 px-2">
            <div className="flex items-center space-x-2">
              {isVoiceEnabled && (
                <button
                  onClick={handleReplayAudio}
                  className="text-gray-400 hover:text-green-600 transition-all duration-200 p-2 rounded-full hover:bg-green-50"
                  aria-label="Replay audio"
                >
                  <Icon name="volumeUp" className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Feedback */}
            <div className="flex items-center space-x-2">
              {!message.feedback ? (
                <>
                  <button onClick={() => handleFeedback('up')} className="text-gray-400 hover:text-green-600 hover:scale-110 active:scale-95 transition-all duration-200 p-2 rounded-full hover:bg-green-50" aria-label="Helpful">
                    <Icon name="thumbUp" className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleFeedback('down')} className="text-gray-400 hover:text-red-600 hover:scale-110 active:scale-95 transition-all duration-200 p-2 rounded-full hover:bg-red-50" aria-label="Not helpful">
                    <Icon name="thumbDown" className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-green-50">
                  {message.feedback === 'up' && <Icon name="thumbUpSolid" className="w-4 h-4 text-green-600" />}
                  {message.feedback === 'down' && <Icon name="thumbDownSolid" className="w-4 h-4 text-red-600" />}
                  <span className="text-xs text-green-700 font-medium">Thanks!</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {isUser && (
         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 ring-4 ring-blue-100">
          <Icon name="user" className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;