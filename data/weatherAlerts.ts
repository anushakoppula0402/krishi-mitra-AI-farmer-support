import type { WeatherAlert } from '../types';

export const alertTypes = ['heavyRain', 'drought', 'frost'];

const alerts: WeatherAlert[] = [
  {
    id: 1,
    type: 'heavyRain',
    message: {
      en: 'Heavy rain expected in the next 48 hours. Ensure proper drainage for crops.',
      hi: 'अगले 48 घंटों में भारी बारिश की उम्मीद है। फसलों के लिए उचित जल निकासी सुनिश्चित करें।',
      ml: 'അടുത്ത 48 മണിക്കൂറിനുള്ളിൽ കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. വിളകൾക്ക് ശരിയായ ഡ്രെയിനേജ് ഉറപ്പാക്കുക.',
      te: 'రాబోయే 48 గంటల్లో భారీ వర్షాలు కురిసే అవకాశం ఉంది. పంటలకు సరైన నీటిపారుదల ఉండేలా చూసుకోండి.',
    },
  },
  {
    id: 2,
    type: 'drought',
    message: {
      en: 'Drought warning: Low rainfall predicted for the next two weeks. Conserve water.',
      hi: 'सूखे की चेतावनी: अगले दो हफ्तों तक कम वर्षा का अनुमान है। पानी का संरक्षण करें।',
      ml: 'വരൾച്ചാ മുന്നറിയിപ്പ്: അടുത്ത രണ്ടാഴ്ചത്തേക്ക് കുറഞ്ഞ മഴ പ്രവചിക്കുന്നു. വെള്ളം സംരക്ഷിക്കുക.',
      te: 'కరువు హెచ్చరిక: రాబోయే రెండు వారాల పాటు తక్కువ వర్షపాతం అంచనా. నీటిని పొదుపుగా వాడండి.',
    },
  },
  {
    id: 3,
    type: 'frost',
    message: {
      en: 'Frost alert tonight. Protect sensitive crops from low temperatures.',
      hi: 'आज रात पाला पड़ने की चेतावनी। संवेदनशील फसलों को कम तापमान से बचाएं।',
      ml: 'ഇന്ന് രാത്രി മഞ്ഞുവീഴ്ചയ്ക്ക് സാധ്യതയുണ്ട്. ദുർബലമായ വിളകളെ താഴ്ന്ന താപനിലയിൽ നിന്ന് സംരക്ഷിക്കുക.',
      te: 'ఈ రాత్రి మంచు హెచ్చరిక. సున్నితమైన పంటలను తక్కువ ఉష్ణోగ్రతల నుండి రక్షించండి.',
    },
  },
];

export const getMockWeatherAlert = (): WeatherAlert => {
    const randomIndex = Math.floor(Math.random() * alerts.length);
    return alerts[randomIndex];
}