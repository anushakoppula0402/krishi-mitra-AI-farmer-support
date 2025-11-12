import type { MachineryCategory } from '../types';

export const machineryData: MachineryCategory[] = [
  {
    id: 'tillage',
    name: {
      en: 'Tillage Equipment',
      hi: 'जुताई उपकरण',
      ml: 'ഉഴവ് ഉപകരണങ്ങൾ',
      te: 'దున్నే పరికరాలు',
    },
    machinery: [
      {
        name: { en: 'Rotary Tiller (Rotavator)', hi: 'रोटरी टिलर (रोटावेटर)', ml: 'റോട്ടറി ടില്ലർ (റോട്ടവേറ്റർ)', te: 'రోటరీ టిల్లర్ (రోటావేటర్)' },
        description: {
          en: 'Used for seedbed preparation by mixing and pulverizing the soil.',
          hi: 'बीज की क्यारी तैयार करने के लिए मिट्टी को मिलाने और चूर्णित करने के लिए उपयोग किया जाता है।',
          ml: 'വിത്ത് തയ്യാറാക്കുന്നതിനായി മണ്ണ് ഇളക്കി പൊടിക്കാൻ ഉപയോഗിക്കുന്നു.',
          te: 'విత్తన పాదులు సిద్ధం చేయడానికి నేలను కలపడానికి మరియు పొడి చేయడానికి ఉపయోగిస్తారు.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f6?w=500&h=300&fit=crop&crop=center',
        cost: 120000,
        subsidy: {
          available: true,
          details: {
            en: 'Up to 50% subsidy available under the Sub-Mission on Agricultural Mechanization (SMAM).',
            hi: 'कृषि यंत्रीकरण पर उप-मिशन (एसएमएएम) के तहत 50% तक की सब्सिडी उपलब्ध है।',
            ml: 'കാർഷിക യന്ത്രവൽക്കരണ ഉപ-മിഷൻ (SMAM) പ്രകാരം 50% വരെ സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'వ్యవసాయ యాంత్రీకరణపై ఉప-మిషన్ (SMAM) కింద 50% వరకు సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/rotavator',
      },
      {
        name: { en: 'Plough', hi: 'हल', ml: 'കലപ്പ', te: 'నాగలి' },
        description: {
          en: 'Essential for primary tillage to cut, turn, and break the soil.',
          hi: 'मिट्टी को काटने, पलटने और तोड़ने के लिए प्राथमिक जुताई के लिए आवश्यक है।',
          ml: 'മണ്ണ് കീറിമറിക്കാനും പൊട്ടിക്കാനും പ്രാഥമിക ഉഴവിന് അത്യാവശ്യമാണ്.',
          te: 'మట్టిని కోయడానికి, తిప్పడానికి మరియు విచ్ఛిన్నం చేయడానికి ప్రాథమిక దున్నడానికి అవసరం.',
        },
        image: 'https://images.unsplash.com/photo-1584836410042-ef2da419874d?w=500&h=300&fit=crop&crop=center',
        cost: 45000,
        subsidy: {
          available: true,
          details: {
            en: 'Subsidies are available through state-specific agricultural schemes.',
            hi: 'राज्य-विशिष्ट कृषि योजनाओं के माध्यम से सब्सिडी उपलब्ध हैं।',
            ml: 'സംസ്ഥാന-നിർദ്ദിഷ്ട കാർഷിക പദ്ധതികൾ വഴി സബ്സിഡികൾ ലഭ്യമാണ്.',
            te: 'రాష్ట్ర-నిర్దిష్ట వ్యవసాయ పథకాల ద్వారా సబ్సిడీలు అందుబాటులో ఉన్నాయి.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/plough',
      },
      {
        name: { en: 'Disc Harrow', hi: 'डिस्क हैरो', ml: 'ഡിസ്ക് ഹാരോ', te: 'డిస్క్ హారో' },
        description: {
          en: 'Used for breaking up clods, smoothing the soil surface, and preparing a fine seedbed.',
          hi: 'मिट्टी के ढेलों को तोड़ने, मिट्टी की सतह को चिकना करने और बारीक बीज की क्यारी तैयार करने के लिए उपयोग किया जाता है।',
          ml: 'മണ്ണ് കുഴിക്കുന്നതിനും മണ്ണിന്റെ പ്രതലം മിനുസപ്പെടുത്തുന്നതിനും നല്ല വിത്ത് കിടക്ക തയ്യാറാക്കുന്നതിനും ഉപയോഗിക്കുന്നു.',
          te: 'మట్టి గడ్డలను పగలగొట్టడానికి, మట్టి ఉపరితలాన్ని మృదువుగా చేయడానికి మరియు మంచి విత్తన పడకను తయారు చేయడానికి ఉపయోగిస్తారు.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f2?w=500&h=300&fit=crop&crop=center',
        cost: 75000,
        subsidy: {
          available: true,
          details: {
            en: '30-40% subsidy available under various agricultural mechanization schemes.',
            hi: 'विभिन्न कृषि यंत्रीकरण योजनाओं के तहत 30-40% सब्सिडी उपलब्ध है।',
            ml: 'വിവിധ കാർഷിക യന്ത്രവൽക്കരണ പദ്ധതികൾ പ്രകാരം 30-40% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'వివిధ వ్యవసాయ యాంత్రీకరణ పథకాల కింద 30-40% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/disc-harrow',
      },
    ],
  },
  {
    id: 'sowing',
    name: {
      en: 'Sowing and Planting',
      hi: 'बुवाई और रोपण',
      ml: 'വിതയ്ക്കലും നടീലും',
      te: 'విత్తడం మరియు నాటడం',
    },
    machinery: [
      {
        name: { en: 'Seed Drill', hi: 'सीड ड्रिल', ml: 'സീഡ് ഡ്രിൽ', te: 'సీడ్ డ్రిల్' },
        description: {
          en: 'Ensures seeds are sown at the correct depth and spacing for optimal growth.',
          hi: 'यह सुनिश्चित करता है कि बीज इष्टतम विकास के लिए सही गहराई और दूरी पर बोए जाएं।',
          ml: 'വിത്തുകൾ ശരിയായ ആഴത്തിലും അകലത്തിലും വിതച്ച് ഒപ്റ്റിമൽ വളർച്ച ഉറപ്പാക്കുന്നു.',
          te: 'విత్తనాలు సరైన లోతులో మరియు సరైన దూరంలో విత్తబడతాయని నిర్ధారిస్తుంది, ఇది సరైన పెరుగుదలకు దారితీస్తుంది.',
        },
        image: 'https://images.unsplash.com/photo-1591370998009-50d3b6ab0ac5?w=500&h=300&fit=crop&crop=center',
        cost: 85000,
        subsidy: {
          available: true,
          details: {
            en: 'Financial assistance of 40-50% is provided under various central and state schemes.',
            hi: 'विभिन्न केंद्र और राज्य योजनाओं के तहत 40-50% की वित्तीय सहायता प्रदान की जाती है।',
            ml: 'വിവിധ കേന്ദ്ര-സംസ്ഥാന പദ്ധതികൾ പ്രകാരം 40-50% സാമ്പത്തിക സഹായം നൽകുന്നു.',
            te: 'వివిధ కేంద్ర మరియు రాష్ట్ర పథకాల కింద 40-50% ఆర్థిక సహాయం అందించబడుతుంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/seed-drill',
      },
      {
        name: { en: 'Transplanter', hi: 'ट्रांसप्लांटर', ml: 'ട്രാൻസ്പ്ലാൻറർ', te: 'ట్రాన్స్ప్లాన్టర్' },
        description: {
          en: 'Used for transplanting rice seedlings from nursery to main field with proper spacing.',
          hi: 'नर्सरी से मुख्य खेत में धान के पौधों को उचित दूरी के साथ रोपने के लिए उपयोग किया जाता है।',
          ml: 'നാർസറിയിൽ നിന്ന് മുഖ്യ ക്ഷേത്രത്തേക്ക് നെൽലിനാർ തർക്കലെ സരിയായ അകലത്തിൽ നടാന് ഉപയോഗിക്കുന്നു.',
          te: 'నర్సరీ నుండి ముఖ్య క్షేత్రానికి వెల్లుళ్ళి నాటులను సరైన అకలన్లో నటడానికి ఉపయోగిస్తారు.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f7?w=500&h=300&fit=crop&crop=center',
        cost: 150000,
        subsidy: {
          available: true,
          details: {
            en: 'Up to 60% subsidy available for rice transplanter under state schemes.',
            hi: 'राज्य योजनाओं के तहत धान ट्रांसप्लांटर के लिए 60% तक की सब्सिडी उपलब्ध है।',
            ml: 'സംസ്ഥാന പദ്ധതികൾ പ്രകാരം നെൽല് ട്രാൻസ്പ്ലാൻറരിനു 60% വരെ സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'రాష్ట్ర పథకాల కింద వెల్లుళ్ళి ట్రాన్స్ప్లాన్టర్ కోసం 60% వరకు సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/transplanter',
      },
    ],
  },
  {
    id: 'harvesting',
    name: {
      en: 'Harvesting Equipment',
      hi: 'कटाई उपकरण',
      ml: 'വിളവെടുപ്പ് ഉപകരണങ്ങൾ',
      te: 'పంట కోత పరికరాలు',
    },
    machinery: [
      {
        name: { en: 'Combine Harvester', hi: 'कंबाइन हार्वेस्टर', ml: 'കംബൈൻ ഹാർവെസ്റ്റർ', te: 'కంబైన్ హార్వెస్టర్' },
        description: {
          en: 'A versatile machine that combines reaping, threshing, and winnowing into a single process.',
          hi: 'एक बहुमुखी मशीन जो कटाई, गहाई और ओसाई को एक ही प्रक्रिया में जोड़ती है।',
          ml: 'കൊയ്ത്ത്, മെതിക്കൽ, പാറ്റൽ എന്നിവ ഒരൊറ്റ പ്രക്രിയയിൽ സംയോജിപ്പിക്കുന്ന ഒരു ബഹുമുഖ യന്ത്രം.',
          te: 'కోత, నూర్పిడి మరియు తూర్పారబట్టడం వంటి పనులను ఒకే ప్రక్రియలో కలిపే ఒక బహుముఖ యంత్రం.',
        },
        image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&h=300&fit=crop&crop=center',
        cost: 2500000,
        subsidy: {
          available: true,
          details: {
            en: 'Significant subsidies available for farmer groups and cooperatives through SMAM.',
            hi: 'एसएमएएम के माध्यम से किसान समूहों और सहकारी समितियों के लिए महत्वपूर्ण सब्सिडी उपलब्ध है।',
            ml: 'SMAM വഴി കർഷക ഗ്രൂപ്പുകൾക്കും സഹകരണ സംഘങ്ങൾക്കും കാര്യമായ സബ്‌സിഡികൾ ലഭ്യമാണ്.',
            te: 'SMAM ద్వారా రైతు బృందాలు మరియు సహకార సంఘాలకు గణనీయమైన సబ్సిడీలు అందుబాటులో ఉన్నాయి.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/combine-harvester',
      },
      {
        name: { en: 'Reaper', hi: 'काटने की मशीन', ml: 'റീപ്പർ', te: 'కొయ్యే యంత్రం' },
        description: {
          en: 'Cuts the crop and lays it in windrows for easier collection and handling.',
          hi: 'फसल को काटता है और आसान संग्रह और हैंडलिंग के लिए इसे पंक्तियों में बिछाता है।',
          ml: 'വിള കൊയ്ത്ത് എളുപ്പത്തിനായി സംഗ്രഹണത്തിനും കൈകാര്യത്തിനും വരികൾമായി വയ്ക്കുന്നു.',
          te: 'పంటను కొయ్యుచు కొలెక్షన్ మరియు హ్యాండలింగ్ కోసం వరుసల్లో వేసి వయ్కుతుంది.',
        },
        image: 'https://images.unsplash.com/photo-1581092335878-5b32d3793d2c?w=500&h=300&fit=crop&crop=center',
        cost: 180000,
        subsidy: {
          available: true,
          details: {
            en: '40-50% subsidy available for small and marginal farmers.',
            hi: 'छोटे और सीमांत किसानों के लिए 40-50% सब्सिडी उपलब्ध है।',
            ml: 'ചെറിയ മാർജിനൽ കർഷകർക്ക് 40-50% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'చిన్న మరియు మార్జినల్ రైతులకు 40-50% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/reaper',
      },
    ],
  },
  {
    id: 'irrigation',
    name: {
      en: 'Irrigation Equipment',
      hi: 'सिंचाई उपकरण',
      ml: 'രീതി ഉപകരണങ്ങൾ',
      te: 'రీతి పరికరాలు',
    },
    machinery: [
      {
        name: { en: 'Drip Irrigation System', hi: 'ड्रिप सिंचाई प्रणाली', ml: 'ഡ്രിപ്പ് രീതി സിസ്റ്റം', te: 'డ్రిప్ రీతి సిస్టం' },
        description: {
          en: 'Water-efficient irrigation system that delivers water directly to plant roots.',
          hi: 'जल-कुशल सिंचाई प्रणाली जो पौधों की जड़ों तक सीधे पानी पहुंचाती है।',
          ml: 'വെള്ളത്തിന്റെ വേരുകൾവരെ നേരിട്ട് കൈയിടുന്ന ജല-കാര്യക്ഷമമായ രീതി സിസ്റ്റം.',
          te: 'చెట్ల వేరులకు నేరుగా నీళ్ళని పంపించే నీళ్ళు-కార్యక്షమమైన రీతి వ్యవస్థ.',
        },
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop&crop=center',
        cost: 25000,
        subsidy: {
          available: true,
          details: {
            en: 'Up to 90% subsidy available under Pradhan Mantri Krishi Sinchayee Yojana (PMKSY).',
            hi: 'प्रधान मंत्री कृषि सिंचाई योजना (PMKSY) के तहत 90% तक की सब्सिडी उपलब्ध है।',
            ml: 'പ്രധാന മന്ത്രി കൃഷി സിന്ചയി യോജന (PMKSY) പ്രകാരം 90% വരെ സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'ప్రధాన మంత్రి కృషి సించాయీ యోజన (PMKSY) కింద 90% వరకు సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://pmksy.gov.in/',
      },
      {
        name: { en: 'Sprinkler System', hi: 'स्प्रिंकलर सिस्टम', ml: 'സ്പ്രിങ്ക്ളർ സിസ്റ്റം', te: 'స్ప్రింక్లర్ సిస్టం' },
        description: {
          en: 'Automated irrigation system that sprays water over crops like natural rainfall.',
          hi: 'स्वचालित सिंचाई प्रणाली जो प्राकृतिक बारिश की तरह फसलों पर पानी छिड़कती है।',
          ml: 'പ്രാകൃതിക മഴയെപ്പോലെ വിളകൾമേൽ വെള്ളം തിളിക്കുന്ന സ്വയം പരിശോധന രീതി സിസ്റ്റം.',
          te: 'ప్రాకృతిక వర్షం లాగా పంటల మేలె నీళ్ళను చిలుకునే స్వయంచాలక రీతి వ్యవస్థ.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f3?w=500&h=300&fit=crop&crop=center',
        cost: 35000,
        subsidy: {
          available: true,
          details: {
            en: '80% subsidy available under Micro Irrigation Fund.',
            hi: 'माइक्रो आरिगेशन फंड के तहत 80% सब्सिडी उपलब्ध है।',
            ml: 'മൈക്രോ രീതി ഫണ്ടിന് കീഴിൽ 80% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'మైక్రో రీతి ఫండ్ కింద 80% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://pmksy.gov.in/microirrigation/',
      },
    ],
  },
  {
    id: 'postharvest',
    name: {
      en: 'Post-Harvest Equipment',
      hi: 'कटाई के बाद उपकरण',
      ml: 'വിളവെടുപ്പിന് ശേഷമുള്ള ഉപകരണങ്ങൾ',
      te: 'కోత తర్వాత పరికరాలు',
    },
    machinery: [
      {
        name: { en: 'Thresher', hi: 'थ्रेशर', ml: 'മെതിക്കൽ യന്ത്രം', te: 'నూర్పిడి యంత్రం' },
        description: {
          en: 'Separates grain from stalks and chaff efficiently after harvest.',
          hi: 'कटाई के बाद दानों को डंठल और भूसे से कुशलता से अलग करता है।',
          ml: 'വിളവെടുപ്പിന് ശേഷം ധാന്യത്തെ തണ്ടുകളിൽ നിന്നും പതിരിൽ നിന്നും കാര്യക്ഷമമായി വേർതിരിക്കുന്നു.',
          te: 'కోత తర్వాత ధాన్యాన్ని కాండాలు మరియు పొట్టు నుండి సమర్థవంతంగా వేరు చేస్తుంది.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f4?w=500&h=300&fit=crop&crop=center',
        cost: 95000,
        subsidy: {
          available: true,
          details: {
            en: '40% subsidy available under agricultural mechanization schemes.',
            hi: 'कृषि यंत्रीकरण योजनाओं के तहत 40% सब्सिडी उपलब्ध है।',
            ml: 'കാർഷിക യന്ത്രവൽക്കരണ പദ്ധതികൾ പ്രകാരം 40% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'వ్యవసాయ యాంత్రీకరణ పథకాల కింద 40% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/thresher',
      },
      {
        name: { en: 'Grain Cleaner', hi: 'अनाज क्लीनर', ml: 'ധാന്യ ക്ലീനർ', te: 'ధాన్యం క్లీనర్' },
        description: {
          en: 'Removes impurities, chaff, and foreign materials from harvested grains.',
          hi: 'कटाई किए गए अनाज से अशुद्धियों, भूसे और विदेशी सामग्री को हटाता है।',
          ml: 'കൊയ്ത ധാന്യങ്ങളിൽ നിന്ന് അശുദ്ധതകൾ, പതിർ, വിദേശ വസ്തുക്കൾ എന്നിവ നീക്കം ചെയ്യുന്നു.',
          te: 'కోసిన ధాన్యాల నుండి మలినాలు, పొట్టు మరియు విదేశీ పదార్థాలను తొలగిస్తుంది.',
        },
        image: 'https://images.unsplash.com/photo-1595863045343-f50e02e403ed?w=500&h=300&fit=crop&crop=center',
        cost: 45000,
        subsidy: {
          available: true,
          details: {
            en: '30% subsidy available under post-harvest management schemes.',
            hi: 'कटाई के बाद प्रबंधन योजनाओं के तहत 30% सब्सिडी उपलब्ध है।',
            ml: 'വിളവെടുപ്പിനു ശേഷമുള്ള മാനേജ്മെന്റ് പദ്ധതികൾ പ്രകാരം 30% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'కోత అనంతర నిర్వహణ పథకాల కింద 30% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/grain-cleaner',
      },
      {
        name: { en: 'Drying Machine', hi: 'ड्राइंग मशीन', ml: 'ഉണക്കൽ യന്ത്രം', te: 'ఎండబెట్టే యంత్రం' },
        description: {
          en: 'Reduces moisture content in harvested grains to prevent spoilage and ensure quality.',
          hi: 'कटाई किए गए अनाज में नमी की मात्रा कम करता है ताकि खराब होने से रोका जा सके और गुणवत्ता सुनिश्चित की जा सके।',
          ml: 'കൊയ്ത ധാന്യങ്ങളിൽ ഈർപ്പത്തിന്റെ അളവ് കുറച്ച് കേടാകാത്തതും ഗുണനിലവാരം ഉറപ്പാക്കുന്നതുമാണ്.',
          te: 'కోసిన ధాన్యాల్లో తేమ శాతం తగ్గించి చెడిపోకుండా మరియు నాణ్యత హామీ చేయడానికి.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f8?w=500&h=300&fit=crop&crop=center',
        cost: 75000,
        subsidy: {
          available: true,
          details: {
            en: '35% subsidy available under infrastructure development schemes.',
            hi: 'बुनियादी ढांचा विकास योजनाओं के तहत 35% सब्सिडी उपलब्ध है।',
            ml: 'അടിസ്ഥാന സൗകര്യ വികസന പദ്ധതികൾ പ്രകാരം 35% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'మౌలిక వసతుల అభివృద్ధి పథకాల కింద 35% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/drying-machine',
      },
    ],
  },
  {
    id: 'protection',
    name: {
      en: 'Crop Protection Equipment',
      hi: 'फसल सुरक्षा उपकरण',
      ml: 'വിള സംരക्षണ ഉപകരണങ്ങൾ',
      te: 'పంట రక్షణ పరికరాలు',
    },
    machinery: [
      {
        name: { en: 'Knapsack Sprayer', hi: 'नैपसैक स्प्रेयर', ml: 'നാപ്സാക്ക് സ്പ്രേയർ', te: 'నాప్సాక్ స్ప్రేయర్' },
        description: {
          en: 'Portable spraying equipment for applying pesticides, herbicides, and fertilizers.',
          hi: 'कीटनाशक, खरपतवारनाशी और उर्वरक छिड़कने के लिए पोर्टेबल स्प्रेइंग उपकरण।',
          ml: 'കീടനാശിനികൾ, കളനാശിനികൾ, വളങ്ങൾ എന്നിവ പ്രയോഗിക്കാനുള്ള പോർട്ടബിൾ സ്പ്രേയിംഗ് ഉപകരണം.',
          te: 'పురుగుల మందులు, కలుపు మందులు, ఎరువులు వాడేందుకు పోర్టబుల్ స్ప్రేయింగ్ పరికరం.',
        },
        image: 'https://images.unsplash.com/photo-1596097635166-a0e546b653f5?w=500&h=300&fit=crop&crop=center',
        cost: 3500,
        subsidy: {
          available: true,
          details: {
            en: '50% subsidy available for small hand tools under various schemes.',
            hi: 'विभिन्न योजनाओं के तहत छोटे हाथ के औजारों के लिए 50% सब्सिडी उपलब्ध है।',
            ml: 'വിവിധ പദ്ധതികൾ പ്രകാരം ചെറിയ കൈ ഉപകരണങ്ങൾക്ക് 50% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'వివిధ పథకాల కింద చిన్న చేతి పరికరాలకు 50% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/knapsack-sprayer',
      },
      {
        name: { en: 'Power Sprayer', hi: 'पावर स्प्रेयर', ml: 'പവർ സ്പ്രേയർ', te: 'పవర్ స్ప్రేయర్' },
        description: {
          en: 'Motorized sprayer for efficient coverage of large areas with chemicals or fertilizers.',
          hi: 'रसायनों या उर्वरकों के साथ बड़े क्षेत्रों के कुशल कवरेज के लिए मोटर चालित स्प्रेयर।',
          ml: 'രാസവസ്തുക്കളോ വളങ്ങളോ ഉപയോഗിച്ച് വലിയ പ്രദേശങ്ങളിൽ കാര്യക്ഷമമായ കവറേജിനായി മോട്ടോർ സ്പ്രേയർ.',
          te: 'రసాయనాలు లేదా ఎరువులతో పెద్ద ప్రాంతాలను సమర్థవంతంగా కవర్ చేయడానికి మోటారు స్ప్రేయర్.',
        },
        image: 'https://images.unsplash.com/photo-1591370998009-50d3b6ab0ac4?w=500&h=300&fit=crop&crop=center',
        cost: 25000,
        subsidy: {
          available: true,
          details: {
            en: '40% subsidy available for plant protection equipment.',
            hi: 'पौधे संरक्षण उपकरण के लिए 40% सब्सिडी उपलब्ध है।',
            ml: 'സസ്യ സംരക്ഷണ ഉപകരണങ്ങൾക്ക് 40% സബ്‌സിഡി ലഭ്യമാണ്.',
            te: 'మొక్కల రక్షణ పరికరాలకు 40% సబ్సిడీ అందుబాటులో ఉంది.',
          }
        },
        link: 'https://agrimachinery.nic.in/portal/implement/power-sprayer',
      },
    ],
  },
];