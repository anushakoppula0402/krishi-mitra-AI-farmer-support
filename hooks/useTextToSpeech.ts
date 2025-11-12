import { useCallback } from 'react';

const speakWithSelectedVoice = (text: string, lang: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  const voices = window.speechSynthesis.getVoices();
  
  // Find the best voice for the requested language.
  // 1. Exact match (e.g., 'te-IN')
  let voice = voices.find(v => v.lang === lang);
  
  // 2. Language match (e.g., 'te') if no exact match is found
  if (!voice) {
    const langCode = lang.split('-')[0];
    voice = voices.find(v => v.lang.startsWith(langCode));
  }
  
  if (voice) {
    utterance.voice = voice;
  } else {
    console.warn(`No specific voice found for language: ${lang}. Using browser default.`);
  }
  
  // Cancel any ongoing speech and start the new one
  window.speechSynthesis.cancel(); 
  window.speechSynthesis.speak(utterance);
};

export const useTextToSpeech = () => {
    
  const speak = useCallback((text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported in this browser.');
      return;
    }

    // Cancel any speech that might be happening from a previous quick interaction.
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    const voices = window.speechSynthesis.getVoices();

    // If voices are already loaded, speak immediately.
    if (voices.length > 0) {
        speakWithSelectedVoice(text, lang);
    } else {
        // If voices are not loaded, set up a one-time listener.
        // The utterance will be spoken as soon as the voices are available.
        window.speechSynthesis.onvoiceschanged = () => {
            speakWithSelectedVoice(text, lang);
            // Important: Remove the listener after it has been used to avoid multiple triggers.
            window.speechSynthesis.onvoiceschanged = null;
        };
    }
  }, []);

  return { speak };
};
