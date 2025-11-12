import React, { useState, useRef, useEffect } from 'react';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { fileToBase64 } from '../utils/fileUtils';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface InputBarProps {
  onSend: (text: string, image?: string) => void;
  language: Language;
  isLoading: boolean;
  onHistoryClick: () => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSend, language, isLoading, onHistoryClick }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<{ base64: string; name: string } | null>(null);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const { isListening, transcript, startListening, stopListening } = useSpeechToText({
    lang: language.bcp47,
  });

  useEffect(() => {
    if (isListening) {
      setText(transcript);
    }
  }, [transcript, isListening]);

  const handleSend = () => {
    if (text.trim() || image) {
      onSend(text.trim(), image?.base64);
      setText('');
      setImage(null);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      setText(''); // Clear text when starting to listen
      startListening();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For image files, convert to base64 for preview and sending
      if (file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        setImage({ base64, name: file.name });
      } else {
        // For non-image files, we'll just show the file name
        setImage({ base64: '', name: file.name });
      }
    }
    // Reset file input to allow re-selecting the same file
    if (e.target) {
        e.target.value = '';
    }
    setIsFileMenuOpen(false);
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDocumentUpload = () => {
    // We'll implement document handling if needed
    if (fileInputRef.current) {
      // Temporarily change the accept attribute to allow documents
      const originalAccept = fileInputRef.current.accept;
      fileInputRef.current.accept = '.pdf,.doc,.docx,.txt,.xls,.xlsx';
      fileInputRef.current.click();
      // Reset after a short delay
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.accept = originalAccept;
        }
      }, 100);
    }
    setIsFileMenuOpen(false);
  };

  return (
    <div className="p-6 bg-white/95 backdrop-blur-sm shadow-lg">
      {image && (
        <div className="mb-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-green-300 shadow-lg bg-white">
            {image.base64 ? (
              <img
                src={image.base64}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <Icon name="document" className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg z-10"
              aria-label="Remove file"
            >
              <Icon name="close" className="w-3 h-3" title="Remove file" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate max-w-20">{image.name}</p>
        </div>
      )}
      <div className="flex items-center gap-3">
         <button
          onClick={onHistoryClick}
          className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl hover:from-green-100 hover:to-green-200 hover:border-green-400 transition-all duration-200 disabled:opacity-50 active:scale-95 shadow-md hover:shadow-lg group"
          disabled={isLoading}
          aria-label="View chat history"
        >
          <Icon name="history" className="w-6 h-6 text-gray-600 group-hover:text-green-700 transition-colors" title="View chat history" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder={isListening ? UI_STRINGS[language.code].listening : UI_STRINGS[language.code].inputPlaceholder}
            className={`w-full py-4 px-6 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-300 rounded-2xl text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 shadow-md hover:shadow-lg ${
              isListening ? 'border-red-400 bg-red-50' : ''
            }`}
            disabled={isLoading}
          />
          {isListening && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="flex space-x-1">
                <div className="w-2 h-6 bg-red-500 rounded animate-pulse"></div>
                <div className="w-2 h-4 bg-red-400 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-5 bg-red-500 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
            className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl hover:from-blue-100 hover:to-blue-200 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 active:scale-95 shadow-md hover:shadow-lg group"
            disabled={isLoading}
            aria-label="Upload file"
          >
            <Icon name="camera" className="w-6 h-6 text-gray-600 group-hover:text-blue-700 transition-colors" title="Upload file" />
          </button>
          
          {isFileMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
              <button
                onClick={handleCameraCapture}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
              >
                <Icon name="camera" className="w-5 h-5 text-gray-600" />
                <span>Take Photo</span>
              </button>
              <button
                onClick={handleFileUpload}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
              >
                <Icon name="image" className="w-5 h-5 text-gray-600" />
                <span>Upload Image</span>
              </button>
              <button
                onClick={handleDocumentUpload}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
              >
                <Icon name="document" className="w-5 h-5 text-gray-600" />
                <span>Upload Document</span>
              </button>
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx" 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={cameraInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          capture="environment"
          className="hidden" 
        />
        
        <button
          onClick={handleMicClick}
          className={`p-3 rounded-2xl transition-all duration-200 disabled:opacity-50 active:scale-95 shadow-md hover:shadow-lg group ${
            isListening 
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white animate-pulse shadow-red-300' 
              : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border border-gray-300 hover:from-purple-100 hover:to-purple-200 hover:border-purple-400'
          }`}
          disabled={isLoading}
          aria-label="Use microphone"
        >
          <Icon name="mic" className={`w-6 h-6 transition-colors ${
            isListening ? 'text-white' : 'group-hover:text-purple-700'
          }`} title="Use microphone" />
        </button>

        <button
          onClick={handleSend}
          className="p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 disabled:from-green-300 disabled:to-green-400 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl disabled:shadow-md transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
          disabled={isLoading || (!text.trim() && !image)}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Icon name="send" className="w-6 h-6" title="Send message" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputBar;