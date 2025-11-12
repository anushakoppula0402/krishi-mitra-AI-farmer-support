// Simple translation service for demonstration
// In a real app, you would integrate with Google Translate API, Microsoft Translator, or similar

interface TranslationCache {
  [key: string]: string;
}

// Sample translations for common agricultural terms and phrases
const translationDatabase = {
  'en-hi': {
    // Greetings and common phrases
    'Hello': 'नमस्ते',
    'Thank you': 'धन्यवाद',
    'Welcome': 'स्वागत है',
    'Good morning': 'सुप्रभात',
    'Good evening': 'शुभ संध्या',
    'How can I help you': 'मैं आपकी कैसे सहायता कर सकता हूं',
    'Please': 'कृपया',
    'Yes': 'हां',
    'No': 'नहीं',
    
    // Agricultural terms
    'Agriculture': 'कृषि',
    'Farming': 'खेती',
    'Crop': 'फसल',
    'Crops': 'फसलें',
    'Soil': 'मिट्टी',
    'Water': 'पानी',
    'Weather': 'मौसम',
    'Rain': 'बारिश',
    'Irrigation': 'सिंचाई',
    'Fertilizer': 'उर्वरक',
    'Pesticide': 'कीटनाशक',
    'Pesticides': 'कीटनाशक',
    'Harvest': 'फसल कटाई',
    'Seed': 'बीज',
    'Seeds': 'बीज',
    'Plant': 'पौधा',
    'Plants': 'पौधे',
    'Field': 'खेत',
    'Farm': 'फार्म',
    'Farmer': 'किसान',
    'Farmers': 'किसान',
    
    // Government and schemes
    'Government': 'सरकार',
    'Scheme': 'योजना',
    'Schemes': 'योजनाएं',
    'Subsidy': 'सब्सिडी',
    'Benefits': 'लाभ',
    'Application': 'आवेदन',
    'Documents': 'दस्तावेज',
    
    // Market and economics
    'Market': 'बाजार',
    'Price': 'कीमत',
    'Prices': 'कीमतें',
    'Cost': 'लागत',
    'Profit': 'लाभ',
    'Income': 'आय',
    'Budget': 'बजट',
    'Money': 'पैसा',
    
    // General advice terms
    'Help': 'सहायता',
    'Tips': 'सुझाव',
    'Advice': 'सलाह',
    'Recommendation': 'सिफारिश',
    'Important': 'महत्वपूर्ण',
    'Note': 'ध्यान दें',
    'Warning': 'चेतावनी',
    
    // Problems and solutions
    'Disease': 'बीमारी',
    'Diseases': 'बीमारियां',
    'Pest': 'कीट',
    'Pests': 'कीड़े',
    'Problem': 'समस्या',
    'Problems': 'समस्याएं',
    'Solution': 'समाधान',
    'Solutions': 'समाधान',
    
    // Time and seasons
    'Today': 'आज',
    'Tomorrow': 'कल',
    'Week': 'सप्ताह',
    'Month': 'महीना',
    'Year': 'साल',
    'Season': 'मौसम',
    'Summer': 'गर्मी',
    'Winter': 'सर्दी',
    'Monsoon': 'मानसून',
    
    // Common verbs
    'use': 'उपयोग करें',
    'apply': 'लगाएं',
    'plant': 'लगाएं',
    'grow': 'उगाएं',
    'harvest': 'काटें',
    'water': 'पानी दें',
    'should': 'चाहिए',
    'must': 'अवश्य',
    'can': 'सकते हैं',
    'will': 'होगा',
    'need': 'जरूरत',
    
    // Common connectors and phrases
    'and': 'और',
    'or': 'या',
    'but': 'लेकिन',
    'because': 'क्योंकि',
    'therefore': 'इसलिए',
    'however': 'हालांकि',
    'also': 'भी',
    'for example': 'उदाहरण के लिए',
    'such as': 'जैसे कि',
    'in addition': 'इसके अलावा',
    
    // Additional agricultural terms
    'Organic': 'जैविक',
    'Chemical': 'रासायनिक',
    'Natural': 'प्राकृतिक',
    'Hybrid': 'संकर',
    'Quality': 'गुणवत्ता',
    'Quantity': 'मात्रा',
    'Production': 'उत्पादन',
    'Productivity': 'उत्पादकता',
    'Technology': 'तकनीक',
    'Equipment': 'उपकरण',
    'Machine': 'मशीन',
    'Machinery': 'मशीनरी',
    'Tool': 'औजार',
    'Tools': 'औजार',
    'Method': 'तरीका',
    'Technique': 'तकनीक',
    'Techniques': 'तकनीकें',
    'Process': 'प्रक्रिया',
    'Step': 'कदम',
    'Steps': 'कदम',
    'Stage': 'चरण',
    'Stages': 'चरण',
    'Land': 'भूमि',
    'Area': 'क्षेत्र',
    'Region': 'क्षेत्र',
    'Climate': 'जलवायु',
    'Temperature': 'तापमान',
    'Humidity': 'नमी',
    'Moisture': 'नमी',
    'Dry': 'सूखा',
    'Wet': 'गीला',
    'Hot': 'गर्म',
    'Cold': 'ठंडा',
    'Warm': 'गर्म',
    'Cool': 'ठंडा',
    'Good': 'अच्छा',
    'Bad': 'बुरा',
    'Best': 'सबसे अच्छा',
    'Better': 'बेहतर',
    'Worse': 'बदतर',
    'Easy': 'आसान',
    'Difficult': 'कठिन',
    'Simple': 'सरल',
    'Complex': 'जटिल',
    'Fast': 'तेज़',
    'Slow': 'धीमा',
    'Quick': 'तुरंत',
    'Early': 'जल्दी',
    'Late': 'देर से',
    'Time': 'समय',
    'First': 'पहले',
    'Second': 'दूसरे',
    'Third': 'तीसरे',
    'Last': 'अंतिम',
    'Next': 'अगला',
    'Previous': 'पिछला',
    'Before': 'पहले',
    'After': 'बाद में',
    'During': 'के दौरान',
    'While': 'जबकि',
    'When': 'कब',
    'Where': 'कहाँ',
    'How': 'कैसे',
    'What': 'क्या',
    'Why': 'क्यों',
    'Which': 'कौन सा',
    'Who': 'कौन',
    'The': '',
    'This': 'यह',
    'That': 'वह',
    'These': 'ये',
    'Those': 'वे',
    'All': 'सभी',
    'Some': 'कुछ',
    'Many': 'कई',
    'Few': 'कुछ',
    'More': 'अधिक',
    'Less': 'कम',
    'Most': 'सबसे अधिक',
    'Much': 'बहुत',
    'Very': 'बहुत',
    'Too': 'भी',
    'Enough': 'पर्याप्त',
    'Small': 'छोटा',
    'Large': 'बड़ा',
    'Big': 'बड़ा',
    'Little': 'छोटा',
    'High': 'ऊंचा',
    'Low': 'नीचा',
    'Deep': 'गहरा',
    'Shallow': 'उथला',
    'Wide': 'चौड़ा',
    'Narrow': 'संकीर्ण',
    'Long': 'लंबा',
    'Short': 'छोटा',
    'Heavy': 'भारी',
    'Light': 'हल्का',
    'Strong': 'मजबूत',
    'Weak': 'कमजोर',
    'New': 'नया',
    'Old': 'पुराना',
    'Fresh': 'ताजा',
    'Clean': 'साफ',
    'Dirty': 'गंदा',
    'Safe': 'सुरक्षित',
    'Dangerous': 'खतरनाक',
    'Healthy': 'स्वस्थ',
    'Sick': 'बीमार',
    
    // Additional specific terms for better translation
    'Substance': 'पदार्थ',
    'Used': 'उपयोग किया गया',
    'Control': 'नियंत्रण',
    'Come': 'आते हैं',
    'Harm': 'नुकसान',
    'Protect': 'सुरक्षित रखना',
    'Ensure': 'सुनिश्चित करना',
    'Improve': 'सुधारना',
    'Here': 'यहाँ',
    'Think': 'सोचिए',
    'Shield': 'ढाल',
    'Protective': 'सुरक्षात्मक',
    'Insects': 'कीड़े',
    'Aphids': 'एफिड्स',
    'Caterpillars': 'कैटरपिलर्स',
    'Fungi': 'कवक',
    'Blight': 'ब्लाइट',
    'Rust': 'रस्ट',
    'Weeds': 'खरपतवे',
    'Rodents': 'चूहे',
    'Rats': 'चूहे',
    'Insecticides': 'कीटनाशक',
    'Fungicides': 'कवकनाशक',
    'Herbicides': 'शाकनाशी',
    'Rodenticides': 'चूहानाशक',
    'Main': 'मुख्य',
    'Goal': 'लक्ष्य',
    'Yield': 'उपज',
    'Always': 'हमेशा',
    'Follow': 'अनुसरण करें',
    'Recommended': 'अनुशंसित',
    'Dosage': 'खुराक',
    'Wear': 'पहनें',
    'Proper': 'उचित',
    'Gear': 'सामान',
    'Gloves': 'दस्ताने',
    'Mask': 'मास्क',
    'Observe': 'देखें',
    'Pre-harvest': 'फसल काटने से पहले',
    'Interval': 'अंतराल',
    'PHI': 'पीएचआई',
    'Choose': 'चुनें',
    'Products': 'उत्पाद',
    'Reputable': 'प्रतिष्ठित',
    'Brands': 'ब्रांड',
    'Using': 'उपयोग करना',
    'Correctly': 'सही तरीके से',
    'Ensures': 'सुनिश्चित करता है',
    'Safety': 'सुरक्षा',
    'Family': 'परिवार',
    'Environment': 'पर्यावरण',
    'Consumers': 'उपभोक्ता',
    'Produce': 'उत्पादन',
    'Specific': 'विशिष्ट',
    'Issue': 'समस्या',
    'Consult': 'परामर्श लें',
    'Local': 'स्थानीय',
    'Krishi Vigyan Kendra': 'कृषि विज्ञान केंद्र',
    'KVK': 'केवीके',
    'Department': 'विभाग',
    'Precise': 'सटीक',
    'Guidance': 'मार्गदर्शन',
    'Tailored': 'अनुकूलित',
    'To': 'के लिए',
    'See': 'देखें',
    'Answer': 'उत्तर',
    'Completely': 'पूरी तरह से',
    'Translated': 'अनुवादित',
    'Responsibly': 'जिम्मेदारी से'
  },
  'en-ml': {
    // Greetings and common phrases
    'Hello': 'നമസ്കാരം',
    'Thank you': 'നന്ദി',
    'Welcome': 'സ്വാഗതം',
    'Good morning': 'സുപ്രഭാതം',
    'Good evening': 'സുശുഭ സന്ധ്യ',
    'How can I help you': 'ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും',
    'Please': 'ദയവായി',
    'Yes': 'അതെ',
    'No': 'ഇല്ല',
    
    // Agricultural terms
    'Agriculture': 'കൃഷി',
    'Farming': 'കൃഷി',
    'Crop': 'വിള',
    'Crops': 'വിളകൾ',
    'Soil': 'മണ്ണ്',
    'Water': 'വെള്ളം',
    'Weather': 'കാലാവസ്ഥ',
    'Rain': 'മഴ',
    'Irrigation': 'ജലസേചനം',
    'Fertilizer': 'വളം',
    'Pesticide': 'കീടനാശിനി',
    'Pesticides': 'കീടനാശിനികൾ',
    'Harvest': 'വിളവെടുപ്പ്',
    'Seed': 'വിത്ത്',
    'Seeds': 'വിത്തുകൾ',
    'Plant': 'ചെടി',
    'Plants': 'ചെടികൾ',
    'Field': 'വയൽ',
    'Farm': 'ഫാം',
    'Farmer': 'കർഷകൻ',
    'Farmers': 'കർഷകർ',
    
    // Government and schemes
    'Government': 'സർക്കാർ',
    'Scheme': 'പദ്ധതി',
    'Schemes': 'പദ്ധതികൾ',
    'Subsidy': 'സബ്‌സിഡി',
    'Benefits': 'ആനുകൂല്യങ്ങൾ',
    'Application': 'അപേക്ഷ',
    'Documents': 'പ്രമാണങ്ങൾ',
    
    // Market and economics
    'Market': 'കമ്പോളം',
    'Price': 'വില',
    'Prices': 'വിലകൾ',
    'Cost': 'ചെലവ്',
    'Profit': 'ലാഭം',
    'Income': 'വരുമാനം',
    'Budget': 'ബജറ്റ്',
    'Money': 'പണം',
    
    // General advice terms
    'Help': 'സഹായം',
    'Tips': 'നുറുങ്ങുകൾ',
    'Advice': 'ഉപദേശം',
    'Recommendation': 'ശുപാർശ',
    'Important': 'പ്രധാനം',
    'Note': 'ശ്രദ്ധിക്കുക',
    'Warning': 'മുന്നറിയിപ്പ്',
    
    // Problems and solutions
    'Disease': 'രോഗം',
    'Diseases': 'രോഗങ്ങൾ',
    'Pest': 'കീടം',
    'Pests': 'കീടങ്ങൾ',
    'Problem': 'പ്രശ്നം',
    'Problems': 'പ്രശ്നങ്ങൾ',
    'Solution': 'പരിഹാരം',
    'Solutions': 'പരിഹാരങ്ങൾ',
    
    // Time and seasons
    'Today': 'ഇന്ന്',
    'Tomorrow': 'നാളെ',
    'Week': 'ആഴ്ച',
    'Month': 'മാസം',
    'Year': 'വർഷം',
    'Season': 'കാലം',
    'Summer': 'വേനൽ',
    'Winter': 'ശീതകാലം',
    'Monsoon': 'മഴക്കാലം',
    
    // Common verbs
    'use': 'ഉപയോഗിക്കുക',
    'apply': 'പ്രയോഗിക്കുക',
    'plant': 'നടുക',
    'grow': 'വളർത്തുക',
    'harvest': 'വിളവെടുക്കുക',
    'water': 'വെള്ളം നൽകുക',
    'should': 'വേണം',
    'must': 'അത്യാവശ്യം',
    'can': 'കഴിയും',
    'will': 'ഉം',
    'need': 'ആവശ്യം',
    
    // Common connectors and phrases
    'and': 'ഒപ്പം',
    'or': 'അല്ലെങ്കിൽ',
    'but': 'പക്ഷേ',
    'because': 'കാരണം',
    'therefore': 'അതിനാൽ',
    'however': 'എന്നിരുന്നാലും',
    'also': 'കൂടാതെ',
    'for example': 'ഉദാഹരണത്തിന്',
    'such as': 'അതായത്',
    'in addition': 'കൂടാതെ',
    
    // Additional terms for Malayalam
    'Organic': 'ജൈവിക',
    'Chemical': 'രാസായനിക',
    'Natural': 'പ്രാകൃതിക',
    'Quality': 'ഗുണനിലവാരം',
    'Production': 'ഉത്പാദനം',
    'Technology': 'സാങ്കേതികവിദ്യ',
    'Equipment': 'ഉപകരണങ്ങൾ',
    'Machine': 'യന്ത്രം',
    'Tool': 'ഉപകരണം',
    'Method': 'രീതി',
    'Climate': 'കാലാവസ്ഥ',
    'Temperature': 'താപനില',
    'Good': 'നല്ല',
    'Best': 'ഏറ്റവും നല്ല',
    'Easy': 'എളുപ്പം',
    'Time': 'സമയം',
    'All': 'എല്ലാം',
    'More': 'കൂടുതൽ',
    'Very': 'വളരെ',
    'New': 'പുതിയ',
    'Clean': 'ശുദ്ധമായ',
    'Safe': 'സുരക്ഷിത',
    'Substance': 'പദാർത്ഥം',
    'Used': 'ഉപയോഗിച്ച',
    'Control': 'നിയന്ത്രിക്കുക',
    'Come': 'വരുന്നു',
    'Harm': 'ചേർച്ച',
    'Protect': 'സംരക്ഷിക്കുക',
    'Ensure': 'ഉrparrാക്കുക',
    'Improve': 'മെച്ചപ്പെടുത്തുക',
    'Here': 'ഇവിടെ',
    'Think': 'ചിന്തിക്കുക',
    'Shield': 'ഷീൽഡ്',
    'Protective': 'സംരക്ഷണ',
    'Insects': 'കീടങ്ങൾ',
    'Aphids': 'അഫിഡ്സ്',
    'Caterpillars': 'കാറ്റർപില്ലർസ്',
    'Fungi': 'പൂഞ്ച',
    'Blight': 'ബ്ലൈറ്റ്',
    'Rust': 'റസ്റ്റ്',
    'Weeds': 'മലപ്പുഴുക്കൾ',
    'Rodents': 'ചുണ്ടുകൾ',
    'Rats': 'ചുണ്ടുകൾ',
    'Insecticides': 'കീടനാശിനികൾ',
    'Fungicides': 'പൂഞ്ചനാശിനികൾ',
    'Herbicides': 'മലപ്പുഴുക്കനാശിനികൾ',
    'Rodenticides': 'ചുണ്ടുനാശിനികൾ',
    'Main': 'പ്രധാന',
    'Goal': 'ലക്ഷ്യം',
    'Healthy': 'ആരോഗ്യകരമായ',
    'Yield': 'വിളവ്',
    'Always': 'എല്ലായ്പ്പോഴും',
    'Follow': 'പിന്തുടരുക',
    'Recommended': 'ശുപാർശ ചെയ്ത',
    'Dosage': 'മരുന്നളവ്',
    'Methods': 'രീതികൾ',
    'Wear': 'ധരിക്കുക',
    'Proper': 'ശരിയായ',
    'Gear': 'ഉപകരണം',
    'Gloves': 'കൈയുറകൾ',
    'Mask': 'മാസ്ക്',
    'Observe': 'നിരീക്ഷിക്കുക',
    'Pre-harvest': 'വിളവെടുക്കൽ മുമ്പ്',
    'Interval': 'വിടവ്',
    'PHI': 'പിഎച്ച്ഐ',
    'Choose': 'തിരഞ്ഞെടുക്കുക',
    'Products': 'ഉൽപ്പന്നങ്ങൾ',
    'Reputable': 'പ്രഖ്യാപിത',
    'Brands': 'ബ്രാൻഡുകൾ',
    'Using': 'ഉപയോഗിച്ച്',
    'Correctly': 'ശരിയായി',
    'Ensures': 'ഉrparrാക്കുന്നു',
    'Safety': 'സുരക്ഷ',
    'Family': 'കുടുംബം',
    'Environment': 'പരിതസ്ഥലം',
    'Consumers': 'ഉപഭോക്താക്കൾ',
    'Produce': 'ഉൽപ്പന്നം',
    'Specific': 'പ്രത്യേക',
    'Issue': 'പ്രശ്നം',
    'Consult': 'ബന്ധപ്പെടുക',
    'Local': 'പ്രാദേശിക',
    'Krishi Vigyan Kendra': 'കൃഷി വിജ്ഞാന കേന്ദ്രം',
    'KVK': 'കെവികെ',
    'Department': 'വകുപ്പ്',
    'Precise': 'കൃത്യമായ',
    'Guidance': 'മാർഗനിർദ്ദേശം',
    'Tailored': 'ഇഷ്ടാനുസൃതമായ',
    'To': 'ന്',
    'See': 'കാണുക',
    'Answer': 'മറുപടി',
    'Completely': 'പൂർണ്ണമായി',
    'Translated': 'വിവർത്തനം ചെയ്ത',
    'Responsibly': 'ഉത്തരവാദിത്തത്തോടെ'
  },
  'en-te': {
    // Greetings and common phrases
    'Hello': 'నమస్కారం',
    'Thank you': 'ధన్యవాదాలు',
    'Welcome': 'స్వాగతం',
    'Good morning': 'శుభోదయం',
    'Good evening': 'శుభ సాయంత్రం',
    'How can I help you': 'నేను మీకు ఎలా సహాయపడగలను',
    'Please': 'దయచేసి',
    'Yes': 'అవును',
    'No': 'లేదు',
    
    // Agricultural terms
    'Agriculture': 'వ్యవసాయం',
    'Farming': 'వ్యవసాయం',
    'Crop': 'పంట',
    'Crops': 'పంటలు',
    'Soil': 'మట్టి',
    'Water': 'నీరు',
    'Weather': 'వాతావరణం',
    'Rain': 'వర్షం',
    'Irrigation': 'నీటిపారుదల',
    'Fertilizer': 'వళం',
    'Pesticide': 'కీటనాశకం',
    'Pesticides': 'కీటనాశకాలు',
    'Harvest': 'పంట కోత',
    'Seed': 'విత్తనం',
    'Seeds': 'విత్తనాలు',
    'Plant': 'మొక్క',
    'Plants': 'మొక్కలు',
    'Field': 'పొలం',
    'Farm': 'ఫామ్',
    'Farmer': 'రైతు',
    'Farmers': 'రైతులు',
    
    // Government and schemes
    'Government': 'ప్రభుత్వం',
    'Scheme': 'పథకం',
    'Schemes': 'పథకాలు',
    'Subsidy': 'సబ్సిడీ',
    'Benefits': 'ప్రయోజనాలు',
    'Application': 'దరఖాస్తు',
    'Documents': 'పత్రాలు',
    
    // Market and economics
    'Market': 'మార్కెట్',
    'Price': 'ధర',
    'Prices': 'ధరలు',
    'Cost': 'వ్యయం',
    'Profit': 'లాభం',
    'Income': 'ఆదాయం',
    'Budget': 'బడ్జెట్',
    'Money': 'డబ్బు',
    
    // General advice terms
    'Help': 'సహాయం',
    'Tips': 'చిట్కాలు',
    'Advice': 'సలహా',
    'Recommendation': 'సిఫార్సు',
    'Important': 'ముఖ్యమైన',
    'Note': 'గమనిక',
    'Warning': 'హెచ్చరిక',
    
    // Problems and solutions
    'Disease': 'వ్యాధి',
    'Diseases': 'వ్యాధులు',
    'Pest': 'కీడు',
    'Pests': 'కీడులు',
    'Problem': 'సమస్య',
    'Problems': 'సమస్యలు',
    'Solution': 'పరిష్కారం',
    'Solutions': 'పరిష్కారాలు',
    
    // Time and seasons
    'Today': 'ఈరోజు',
    'Tomorrow': 'రేపు',
    'Week': 'వారం',
    'Month': 'నెల',
    'Year': 'సంవత్సరం',
    'Season': 'కాలం',
    'Summer': 'వేసవి',
    'Winter': 'శీతాకాలం',
    'Monsoon': 'వర్షాకాలం',
    
    // Common verbs
    'use': 'ఉపయోగించండి',
    'apply': 'వర్తింపజేయండి',
    'plant': 'నాటండి',
    'grow': 'వళ్ళేయండి',
    'harvest': 'కోయండి',
    'water': 'నీరు ఇవ్వండి',
    'should': 'వలయ',
    'must': 'తప్పనిసరిగా',
    'can': 'కొట్టగలరు',
    'will': 'ఉంటుంది',
    'need': 'కావాలి',
    
    // Common connectors and phrases
    'and': 'మరియు',
    'or': 'లేదా',
    'but': 'కానీ',
    'because': 'ఎందుకంటే',
    'therefore': 'అందువల్ల',
    'however': 'అయితే',
    'also': 'కూడా',
    'for example': 'ఉదాహరణకు',
    'such as': 'అంటే',
    'in addition': 'అదనంగా',
    
    // Additional terms for Telugu
    'Organic': 'సేవవిక',
    'Chemical': 'రాసాయనిక',
    'Natural': 'ప్రాకృతిక',
    'Quality': 'గుణమెన',
    'Production': 'ఉత్పాదన',
    'Technology': 'సాంకేతికత',
    'Equipment': 'ఉపకరణాలు',
    'Machine': 'యంత్రం',
    'Tool': 'ఉపకరణం',
    'Method': 'పద్ధతి',
    'Climate': 'వాతావరణం',
    'Temperature': 'ఉష్ణోగ్రత',
    'Good': 'మంచి',
    'Best': 'అతి మంచి',
    'Easy': 'సులభం',
    'Time': 'సమయం',
    'All': 'అన్నీ',
    'More': 'కూడా',
    'Very': 'చాలా',
    'New': 'కొత్త',
    'Clean': 'శుభ్రం',
    'Safe': 'సురక్షితం',
    'Substance': 'పదార్థం',
    'Used': 'ఉపయోగించే',
    'Control': 'నియంత్రించడం',
    'Come': 'వస్తాయి',
    'Harm': 'హాని',
    'Protect': 'రక్షించడం',
    'Ensure': 'ఖాయం చేయడం',
    'Improve': 'మెరుగుపరచడం',
    'Here': 'ఇక్కడ',
    'Think': 'ఆలోచించండి',
    'Shield': 'గుప్తాంగం',
    'Protective': 'రక్షణ',
    'Insects': 'కీటకాలు',
    'Aphids': 'అఫిడ్స్',
    'Caterpillars': 'కేటర్పిలర్స్',
    'Fungi': 'పుఞ్జీకృత జీవులు',
    'Blight': 'బ్లైట్',
    'Rust': 'రస్ట్',
    'Weeds': 'గడ్డిపులులు',
    'Rodents': 'ఎలుకలు',
    'Rats': 'ఎలుకలు',
    'Insecticides': 'కీటనాశకాలు',
    'Fungicides': 'పుఞ్జీనాశకాలు',
    'Herbicides': 'గడ్డిపులు నాశనాలు',
    'Rodenticides': 'ఎలుకనాశకాలు',
    'Main': 'ముఖ్య',
    'Goal': 'లక్ష్యం',
    'Healthy': 'ఆరోగ్యకరమైన',
    'Yield': 'దిగుబడి',
    'Always': 'ఎల్లప్పుడూ',
    'Follow': 'అనుసరించండి',
    'Recommended': 'సిఫార్సు చేసిన',
    'Dosage': 'మోతాదు',
    'Methods': 'పద్ధతులు',
    'Wear': 'ధరించండి',
    'Proper': 'సరైన',
    'Gear': 'సామాను',
    'Gloves': 'బాచికలు',
    'Mask': 'ముసుగు',
    'Observe': 'గమనించండి',
    'Pre-harvest': 'పంట కోత ముందు',
    'Interval': 'విరామం',
    'PHI': 'పిహెచ్ఐ',
    'Choose': 'ఎంచుకోండి',
    'Products': 'ఉత్పత్తులు',
    'Reputable': 'ప్రఖ్యాత',
    'Brands': 'బ్రాండ్లు',
    'Using': 'ఉపయోగిస్తున్నప్పుడు',
    'Correctly': 'సరిగా',
    'Ensures': 'ఖాయం చేస్తుంది',
    'Safety': 'భద్రత',
    'Family': 'కుటుంబం',
    'Environment': 'పర్యావరణం',
    'Consumers': 'వినియోగదారులు',
    'Produce': 'ఉత్పత్తి',
    'Specific': 'ప్రత్యేక',
    'Issue': 'సమస్య',
    'Consult': 'సంప్రదించండి',
    'Local': 'స్థానిక',
    'Krishi Vigyan Kendra': 'కృషి విజ్ఞాన్ కేంద్రం',
    'KVK': 'కెవికె',
    'Department': 'శాఖ',
    'Precise': 'ఖచ్చితమైన',
    'Guidance': 'మార్గదర్శకత్వం',
    'Tailored': 'అనుగుణంగా',
    'To': 'కు',
    'See': 'చూడండి',
    'Answer': 'సమాధానం',
    'Completely': 'పూర్తిగా',
    'Translated': 'అనువదించబడింది',
    'Responsibly': 'బాధ్యతతో'
  }
};

const cache: TranslationCache = {};

// Enhanced translation function with better sentence handling
const simpleTranslate = (text: string, sourceLang: string, targetLang: string): string => {
  const key = `${sourceLang}-${targetLang}`;
  const dict = translationDatabase[key as keyof typeof translationDatabase];
  
  if (!dict) {
    return `[${targetLang.toUpperCase()}] ${text}`;
  }
  
  let translatedText = text;
  
  // Handle common mixed phrases first
  const mixedPhrases = [
    { en: "Namaste, Kisan bhai!", hi: "नमस्ते, किसान भाई!", ml: "നമസ്കാരം, കർഷകൻ!", te: "నమస్కారం, రైతు అన్నా!" },
    { en: "I'm Krishi Mitra, here to help.", hi: "मैं कृषि मित्र हूँ, मदद करने के लिए यहाँ हूँ।", ml: "ഞാൻ കൃഷി മിത്രൻ ആണ്, സഹായിക്കാൻ ഇവിടെയുണ്ട്.", te: "నేను కృషి మిత్రుడిని, సహాయం చేయడానికి ఇక్కడ ఉన్నాను." }
  ];
  
  // Replace mixed phrases
  for (const phrase of mixedPhrases) {
    if (targetLang === 'hi' && phrase.hi) {
      translatedText = translatedText.replace(phrase.en, phrase.hi);
    } else if (targetLang === 'ml' && phrase.ml) {
      translatedText = translatedText.replace(phrase.en, phrase.ml);
    } else if (targetLang === 'te' && phrase.te) {
      translatedText = translatedText.replace(phrase.en, phrase.te);
    }
  }
  
  // Split text into sentences for better translation
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  const translatedSentences = sentences.map(sentence => {
    let translatedSentence = sentence;
    
    // Handle common phrases first
    const commonPhrases = [
      "How can I help you", "Thank you for asking", "Here is the information", 
      "You can try", "It is recommended", "For more details",
      "If you have any other questions", "I hope this helps",
      "Please let me know", "Feel free to ask", "In conclusion",
      "To summarize", "Additionally", "Furthermore", "Moreover",
      "However", "Nevertheless", "On the other hand",
      "For example", "Such as", "Including",
      "First", "Second", "Third", "Finally",
      "In order to", "In order", "In addition to",
      "Due to", "Because of", "As a result",
      "According to", "Based on", "In terms of",
      "main goal", "protect your crops", "healthy yield", "improve quality",
      "It's important", "use pesticides", "responsibly", "Always follow",
      "recommended dosage", "application methods", "Wear proper",
      "protective gear", "Observe pre-harvest", "interval", "before harvesting",
      "Choose quality products", "reputable brands", "Using them correctly",
      "ensures safety", "for you", "your family", "environment", "consumers",
      "of your produce", "For any specific", "pest or disease issue",
      "please consult", "local Krishi Vigyan Kendra", "agricultural department",
      "precise guidance", "tailored to", "your farm", "see the answer",
      "is not completely translated"
    ];
    
    // Replace common phrases
    for (const phrase of commonPhrases) {
      if (dict[phrase]) {
        const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        translatedSentence = translatedSentence.replace(regex, dict[phrase]);
      }
    }
    
    // Replace known terms with case-insensitive matching
    for (const [english, translation] of Object.entries(dict)) {
      // Skip common phrases already handled
      if (commonPhrases.includes(english)) continue;
      
      // Handle exact word matches
      const exactRegex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      translatedSentence = translatedSentence.replace(exactRegex, translation);
      
      // Handle plural forms if not already in dictionary
      if (!english.endsWith('s') && !dict[english + 's']) {
        const pluralRegex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s\\b`, 'gi');
        translatedSentence = translatedSentence.replace(pluralRegex, translation + (targetLang === 'hi' ? 'ें' : targetLang === 'ml' ? 'കൾ' : targetLang === 'te' ? 'లు' : 's'));
      }
    }
    
    return translatedSentence;
  });
  
  translatedText = translatedSentences.join(' ');
  
  // Handle common English patterns that weren't translated
  const patterns = {
    'The ': targetLang === 'hi' ? '' : targetLang === 'ml' ? '' : targetLang === 'te' ? '' : 'The ',
    'A ': targetLang === 'hi' ? 'एक ' : targetLang === 'ml' ? 'ഒരു ' : targetLang === 'te' ? 'ఒక ' : 'A ',
    'An ': targetLang === 'hi' ? 'एक ' : targetLang === 'ml' ? 'ഒരു ' : targetLang === 'te' ? 'ఒక ' : 'An ',
    'is ': targetLang === 'hi' ? 'है ' : targetLang === 'ml' ? 'ആണ് ' : targetLang === 'te' ? 'ఉంది ' : 'is ',
    'are ': targetLang === 'hi' ? 'हैं ' : targetLang === 'ml' ? 'आണ് ' : targetLang === 'te' ? 'ఉన్నాయి ' : 'are ',
    'have ': targetLang === 'hi' ? 'के पास है ' : targetLang === 'ml' ? 'ഉണ്ട് ' : targetLang === 'te' ? 'ఉంది ' : 'have ',
    'with ': targetLang === 'hi' ? 'के साथ ' : targetLang === 'ml' ? 'കൂടെ ' : targetLang === 'te' ? 'తో ' : 'with ',
    'from ': targetLang === 'hi' ? 'से ' : targetLang === 'ml' ? 'നിന്നും ' : targetLang === 'te' ? 'నుండి ' : 'from ',
    'to ': targetLang === 'hi' ? 'को ' : targetLang === 'ml' ? 'ലേക്ക് ' : targetLang === 'te' ? 'కు ' : 'to ',
    'in ': targetLang === 'hi' ? 'में ' : targetLang === 'ml' ? 'ൽ ' : targetLang === 'te' ? 'లో ' : 'in ',
    'on ': targetLang === 'hi' ? 'पर ' : targetLang === 'ml' ? 'മേൽ ' : targetLang === 'te' ? 'మీద ' : 'on ',
    'for ': targetLang === 'hi' ? 'के लिए ' : targetLang === 'ml' ? 'വേണ്ടി ' : targetLang === 'te' ? 'కోసం ' : 'for ',
    'this ': targetLang === 'hi' ? 'इस ' : targetLang === 'ml' ? 'ഈ ' : targetLang === 'te' ? 'ఈ ' : 'this ',
    'that ': targetLang === 'hi' ? 'वह ' : targetLang === 'ml' ? 'ആ ' : targetLang === 'te' ? 'ఆ ' : 'that ',
    'these ': targetLang === 'hi' ? 'ये ' : targetLang === 'ml' ? 'ഇവ ' : targetLang === 'te' ? 'ఇవి ' : 'these ',
    'those ': targetLang === 'hi' ? 'वे ' : targetLang === 'ml' ? 'അവ ' : targetLang === 'te' ? 'అవి ' : 'those ',
    'can ': targetLang === 'hi' ? 'कर सकते हैं ' : targetLang === 'ml' ? 'ചെയ്യാം ' : targetLang === 'te' ? 'చేయగలరు ' : 'can ',
    'will ': targetLang === 'hi' ? 'होगा ' : targetLang === 'ml' ? 'ചെയ്യും ' : targetLang === 'te' ? 'చేస్తుంది ' : 'will ',
    'should ': targetLang === 'hi' ? 'चाहिए ' : targetLang === 'ml' ? 'വേണം ' : targetLang === 'te' ? 'కావాలి ' : 'should ',
    'may ': targetLang === 'hi' ? 'हो सकता है ' : targetLang === 'ml' ? 'ചെയ്യാം ' : targetLang === 'te' ? 'చేయవచ్చు ' : 'may ',
    'could ': targetLang === 'hi' ? 'कर सकते हैं ' : targetLang === 'ml' ? 'ചെയ്യാവുന്നതാണ് ' : targetLang === 'te' ? 'చేయగలరు ' : 'could ',
    'would ': targetLang === 'hi' ? 'होगा ' : targetLang === 'ml' ? 'ചെയ്യും ' : targetLang === 'te' ? 'చేస్తుంది ' : 'would ',
    'used ': targetLang === 'hi' ? 'उपयोग किया जाता है ' : targetLang === 'ml' ? 'ഉപയോഗിക്കുന്നു ' : targetLang === 'te' ? 'ఉపయోగిస్తారు ' : 'used ',
    'control ': targetLang === 'hi' ? 'नियंत्रण ' : targetLang === 'ml' ? 'നിയന്ത്രിക്കുക ' : targetLang === 'te' ? 'నియంత్రించడం ' : 'control ',
    'come ': targetLang === 'hi' ? 'आते हैं ' : targetLang === 'ml' ? 'വരുന്നു ' : targetLang === 'te' ? 'వస్తాయి ' : 'come ',
    'harm ': targetLang === 'hi' ? 'नुकसान ' : targetLang === 'ml' ? 'ചേർച്ച ' : targetLang === 'te' ? 'హాని ' : 'harm ',
    'protect ': targetLang === 'hi' ? 'सुरक्षित रखना ' : targetLang === 'ml' ? 'സംരക്ഷിക്കുക ' : targetLang === 'te' ? 'రక్షించడం ' : 'protect ',
    'ensure ': targetLang === 'hi' ? 'सुनिश्चित करना ' : targetLang === 'ml' ? 'ഉrparrാക്കുക ' : targetLang === 'te' ? 'ఖాయం చేయడం ' : 'ensure ',
    'improve ': targetLang === 'hi' ? 'सुधारना ' : targetLang === 'ml' ? 'മെച്ചപ്പെടുത്തുക ' : targetLang === 'te' ? 'మెరుగుపరచడం ' : 'improve ',
    'quality ': targetLang === 'hi' ? 'गुणवत्ता ' : targetLang === 'ml' ? 'ഗുണനിലവാരം ' : targetLang === 'te' ? 'గుణమెన ' : 'quality ',
    'substance ': targetLang === 'hi' ? 'पदार्थ ' : targetLang === 'ml' ? 'പദാർത്ഥം ' : targetLang === 'te' ? 'పదార్థం ' : 'substance ',
    'agriculture ': targetLang === 'hi' ? 'कृषि ' : targetLang === 'ml' ? 'കൃഷി ' : targetLang === 'te' ? 'వ్యవసాయం ' : 'agriculture ',
    'crops ': targetLang === 'hi' ? 'फसलें ' : targetLang === 'ml' ? 'വിളകൾ ' : targetLang === 'te' ? 'పంటలు ' : 'crops ',
    'pests ': targetLang === 'hi' ? 'कीड़े ' : targetLang === 'ml' ? 'കീടങ്ങൾ ' : targetLang === 'te' ? 'కీడులు ' : 'pests ',
    'diseases ': targetLang === 'hi' ? 'बीमारियां ' : targetLang === 'ml' ? 'రോగങ്ങൾ ' : targetLang === 'te' ? 'వ్యాధులు ' : 'diseases ',
    'plants ': targetLang === 'hi' ? 'पौधे ' : targetLang === 'ml' ? 'ചെടികൾ ' : targetLang === 'te' ? 'మొక్కలు ' : 'plants ',
    'weeds ': targetLang === 'hi' ? 'खरपतवे ' : targetLang === 'ml' ? 'മലപ്പുഴുക്കൾ ' : targetLang === 'te' ? 'గడ్డిపులులు ' : 'weeds ',
    'rodents ': targetLang === 'hi' ? 'चूहे ' : targetLang === 'ml' ? 'ചുണ്ടുകൾ ' : targetLang === 'te' ? 'ఎలుకలు ' : 'rodents ',
    'insects ': targetLang === 'hi' ? 'कीड़े ' : targetLang === 'ml' ? 'കീടങ്ങൾ ' : targetLang === 'te' ? 'కీటకాలు ' : 'insects ',
    'fungi ': targetLang === 'hi' ? 'कवक ' : targetLang === 'ml' ? 'പൂഞ്ച ' : targetLang === 'te' ? 'పుఞ్జీకృత జీవులు ' : 'fungi ',
    'herbicides ': targetLang === 'hi' ? 'शाकनाशी ' : targetLang === 'ml' ? 'മലപ്പുഴുക്കനാശിനികൾ ' : targetLang === 'te' ? 'గడ్డిపులు నాశనాలు ' : 'herbicides ',
    'insecticides ': targetLang === 'hi' ? 'कीटनाशक ' : targetLang === 'ml' ? 'കീടനാശിനികൾ ' : targetLang === 'te' ? 'కీటనాశకాలు ' : 'insecticides ',
    'fungicides ': targetLang === 'hi' ? 'कवकनाशक ' : targetLang === 'ml' ? 'പൂഞ്ചനാശിനികൾ ' : targetLang === 'te' ? 'పుఞ్జీనాశకాలు ' : 'fungicides ',
    'rodenticides ': targetLang === 'hi' ? 'चूहानाशक ' : targetLang === 'ml' ? 'ചുണ്ടുനാശിനികൾ ' : targetLang === 'te' ? 'ఎలుకనాశకాలు ' : 'rodenticides ',
    'protective shield ': targetLang === 'hi' ? 'सुरक्षात्मक ढाल ' : targetLang === 'ml' ? 'സംരക്ഷണ ഷീൽഡ് ' : targetLang === 'te' ? 'రక్షణ గుప్తాంగం ' : 'protective shield ',
    'yield ': targetLang === 'hi' ? 'उपज ' : targetLang === 'ml' ? 'വിളവ് ' : targetLang === 'te' ? 'దిగుబడి ' : 'yield ',
    'consumers ': targetLang === 'hi' ? 'उपभोक्ता ' : targetLang === 'ml' ? 'ഉപഭോക്താക്കൾ ' : targetLang === 'te' ? 'వినియోగదారులు ' : 'consumers ',
    'produce ': targetLang === 'hi' ? 'उत्पादन ' : targetLang === 'ml' ? 'ഉൽപ്പന്നം ' : targetLang === 'te' ? 'ఉత్పత్తి ' : 'produce ',
    'consult ': targetLang === 'hi' ? 'परामर्श लें ' : targetLang === 'ml' ? 'ബന്ധപ്പെടുക ' : targetLang === 'te' ? 'సంప్రదించండి ' : 'consult ',
    'precise ': targetLang === 'hi' ? 'सटीक ' : targetLang === 'ml' ? 'കൃത്യമായ ' : targetLang === 'te' ? 'ఖచ్చితమైన ' : 'precise ',
    'guidance ': targetLang === 'hi' ? 'मार्गदर्शन ' : targetLang === 'ml' ? 'മാർഗനിർദ്ദേശം ' : targetLang === 'te' ? 'మార్గదర్శకత్వం ' : 'guidance ',
    'tailored ': targetLang === 'hi' ? 'अनुकूलित ' : targetLang === 'ml' ? 'ഇഷ്ടാനുസൃതമായ ' : targetLang === 'te' ? 'అనుగుణంగా ' : 'tailored ',
    'farm ': targetLang === 'hi' ? 'खेत ' : targetLang === 'ml' ? 'കൃഷിഭൂമി ' : targetLang === 'te' ? 'ఫామ్ ' : 'farm ',
    'KVK ': targetLang === 'hi' ? 'केवीके ' : targetLang === 'ml' ? 'കെവികെ ' : targetLang === 'te' ? 'కెవికె ' : 'KVK '
  };
  
  // Apply pattern replacements
  for (const [pattern, replacement] of Object.entries(patterns)) {
    const regex = new RegExp(`\\b${pattern.trim()}\\b`, 'gi');
    translatedText = translatedText.replace(regex, replacement);
  }
  
  // Clean up extra spaces
  translatedText = translatedText.replace(/\s+/g, ' ').trim();
  
  return translatedText;
};

export const translateText = async (text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> => {
  const cacheKey = `${sourceLang}-${targetLang}-${text}`;
  
  // Check cache first
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  
  try {
    // In a real implementation, you would call a translation API here
    // For now, we'll use our simple translation function
    const translated = simpleTranslate(text, sourceLang, targetLang);
    
    // Cache the result
    cache[cacheKey] = translated;
    
    return translated;
  } catch (error) {
    console.error('Translation failed:', error);
    return `[${targetLang.toUpperCase()}] ${text}`;
  }
};

// Batch translation for efficiency
export const translateBatch = async (
  texts: string[], 
  targetLang: string, 
  sourceLang: string = 'en'
): Promise<string[]> => {
  const promises = texts.map(text => translateText(text, targetLang, sourceLang));
  return Promise.all(promises);
};

// Clear translation cache
export const clearTranslationCache = (): void => {
  Object.keys(cache).forEach(key => delete cache[key]);
};

// Get supported languages
export const getSupportedLanguages = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'te', name: 'తెలుగు' }
  ];
};