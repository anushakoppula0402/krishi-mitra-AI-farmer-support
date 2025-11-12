import { useState, useRef, useEffect } from 'react';

// FIX: Add type definitions for the Web Speech API, which are not standard in TypeScript.
// This resolves errors for SpeechRecognition and related event types.
interface SpeechRecognitionAlternative {
  readonly transcript: string;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
  readonly error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionError) => void;
}

// FIX: The `Window` interface was not augmenting the global `window` object because it was inside a module.
// By wrapping it in `declare global`, the interface correctly merges with the global `Window` type,
// resolving TypeScript errors for `SpeechRecognition` and `webkitSpeechRecognition`.
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechToTextOptions {
  lang?: string;
}

const getSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

export const useSpeechToText = (options: SpeechToTextOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    recognitionRef.current = getSpeechRecognition();
    const recognition = recognitionRef.current;
    if (!recognition) {
        console.warn("Speech recognition not supported in this browser.");
        return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = options.lang || 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let fullTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }
      setTranscript(fullTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    return () => {
      // FIX: Added a null check to prevent runtime error if recognition is not available.
      if (recognition) {
        recognition.stop();
      }
    };
  }, [options.lang]);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (recognition && !isListening) {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};