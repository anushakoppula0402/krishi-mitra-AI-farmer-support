type MultilingualString = {
  en: string;
  hi: string;
  ml: string;
  te: string;
};

export interface CropInsuranceScheme {
  id: number;
  name: MultilingualString;
  description: MultilingualString;
  coverage: MultilingualString;
  premium: MultilingualString;
  claimProcess: MultilingualString;
  eligibility: MultilingualString;
  documents: MultilingualString[];
  benefits: MultilingualString[];
  contactInfo: {
    phone: string;
    website: string;
    email?: string;
  };
}

export const cropInsuranceData: CropInsuranceScheme[] = [
  {
    id: 1,
    name: {
      en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      hi: 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)',
      ml: 'പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന (പിഎംഎഫ്ബിവൈ)',
      te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (పిఎంఎఫ్‌బివై)',
    },
    description: {
      en: 'Comprehensive crop insurance scheme providing financial protection to farmers against crop losses.',
      hi: 'फसल हानि के खिलाफ किसानों को वित्तीय सुरक्षा प्रदान करने वाली व्यापक फसल बीमा योजना।',
      ml: 'വിള നാശത്തിനെതിരെ കർഷകർക്ക് സാമ്പത്തിക സംരക്ഷണം നൽകുന്ന സമഗ്ര വിള ഇൻഷുറൻസ് പദ്ധതി.',
      te: 'పంట నష్టాలకు వ్యతిరేకంగా రైతులకు ఆర్థిక రక్షణ అందించే సమగ్ర పంటల బీమా పథకం.',
    },
    coverage: {
      en: 'Covers yield losses due to natural calamities, pests, diseases, and prevented sowing.',
      hi: 'प्राकृतिक आपदाओं, कीट, रोग और रोकी गई बुवाई के कारण होने वाली उपज हानि को कवर करता है।',
      ml: 'പ്രകൃതി ദുരന്തങ്ങൾ, കീടങ്ങൾ, രോഗങ്ങൾ, തടസ്സപ്പെട്ട വിതയ്ക്കൽ എന്നിവ മൂലമുള്ള വിള നഷ്ടം കവർ ചെയ്യുന്നു.',
      te: 'ప్రకృతి వైపరీత్యాలు, కీటకాలు, వ్యాధులు, అడ్డగించబడిన విత్తనాల వల్ల కలిగే దిగుబడి నష్టాలను కవర్ చేస్తుంది.',
    },
    premium: {
      en: 'Kharif: 2%, Rabi: 1.5%, Commercial/Horticultural: 5% of Sum Insured',
      hi: 'खरीफ: 2%, रबी: 1.5%, वाणिज्यिक/बागवानी: बीमा राशि का 5%',
      ml: 'ഖാരിഫ്: 2%, റാബി: 1.5%, വാണിജ്യ/തോട്ടകൃഷി: ഇൻഷുറൻസ് തുകയുടെ 5%',
      te: 'ఖరీఫ్: 2%, రబీ: 1.5%, వాణిజ్య/తోటపని: బీమా మొత్తంలో 5%',
    },
    claimProcess: {
      en: 'Report loss within 72 hours → Survey by Insurance Company → Claim Settlement within 60 days',
      hi: '72 घंटे के भीतर हानि की रिपोर्ट करें → बीमा कंपनी द्वारा सर्वेक्षण → 60 दिनों के भीतर दावा निपटान',
      ml: '72 മണിക്കൂറിനുള്ളിൽ നഷ്ടം റിപ്പോർട്ട് ചെയ്യുക → ഇൻഷുറൻസ് കമ്പനിയുടെ സർവേ → 60 ദിവസത്തിനുള്ളിൽ ക്ലെയിം തീർപ്പാക്കൽ',
      te: '72 గంటలలోపు నష్టాన్ని నివేదించండి → బీమా కంపెనీ సర్వే → 60 రోజుల్లోపు క్లెయిమ్ పరిష్కారం',
    },
    eligibility: {
      en: 'All farmers (landowners, tenant farmers, sharecroppers) growing notified crops in notified areas',
      hi: 'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान (जमींदार, किरायेदार किसान, बटाईदार)',
      ml: 'വിജ്ഞാപിത പ്രദേശങ്ങളിൽ വിജ്ഞാപിത വിളകൾ വളർത്തുന്ന എല്ലാ കർഷകരും (ഭൂവുടമകൾ, പാട്ടക്കാർ, പങ്കുകാർ)',
      te: 'నోటిఫైడ్ ప్రాంతాలలో నోటిఫైడ్ పంటలు పండించే అందరు రైతులు (భూ యజమానులు, కౌలు రైతులు, వాటాదారులు)',
    },
    documents: [
      {
        en: 'Aadhaar Card',
        hi: 'आधार कार्ड',
        ml: 'ആധാർ കാർഡ്',
        te: 'ఆధార్ కార్డ్',
      },
      {
        en: 'Bank Account Details',
        hi: 'बैंक खाता विवरण',
        ml: 'ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ',
        te: 'బ్యాంక్ ఖాతా వివరాలు',
      },
      {
        en: 'Land Records (Khata/Khasra)',
        hi: 'भूमि रिकॉर्ड (खाता/खसरा)',
        ml: 'ഭൂമി രേഖകൾ (ഖാത/ഖസ്റ)',
        te: 'భూమి రికార్డులు (ఖాతా/ఖస్రా)',
      },
      {
        en: 'Sowing Certificate',
        hi: 'बुवाई प्रमाणपत्र',
        ml: 'വിതയ്ക്കൽ സർട്ടിഫിക്കറ്റ്',
        te: 'విత్తన సర్టిఫికేట్',
      },
    ],
    benefits: [
      {
        en: 'Quick claim settlement',
        hi: 'त्वरित दावा निपटान',
        ml: 'വേഗത്തിലുള്ള ക്ലെയിം തീർപ്പാക്കൽ',
        te: 'వేగవంతమైన క్లెయిమ్ పరిష్కారం',
      },
      {
        en: 'Low premium rates',
        hi: 'कम प्रीमियम दरें',
        ml: 'കുറഞ്ഞ പ്രീമിയം നിരക്കുകൾ',
        te: 'తక్కువ ప్రీమియం రేట్లు',
      },
      {
        en: 'Technology-based assessment',
        hi: 'प्रौद्योगिकी आधारित मूल्यांकन',
        ml: 'സാങ്കേതികവിദ്യ അടിസ്ഥാനമാക്കിയുള്ള വിലയിരുത്തൽ',
        te: 'సాంకేతికత ఆధారిత అంచనా',
      },
    ],
    contactInfo: {
      phone: '14447',
      website: 'https://pmfby.gov.in',
      email: 'support@pmfby.gov.in',
    },
  },
  {
    id: 2,
    name: {
      en: 'Weather Based Crop Insurance Scheme (WBCIS)',
      hi: 'मौसम आधारित फसल बीमा योजना (डब्ल्यूबीसीआईएस)',
      ml: 'കാലാവസ്ഥാ അടിസ്ഥാന വിള ഇൻഷുറൻസ് പദ്ധതി (ഡബ്ല്യുബിസിഐഎസ്)',
      te: 'వాతావరణ ఆధారిత పంటల బీమా పథకం (డబ్ల్యూబిసిఐఎస్)',
    },
    description: {
      en: 'Insurance scheme that covers weather-related yield losses using weather parameters.',
      hi: 'मौसम मापदंडों का उपयोग करके मौसम संबंधी उपज हानि को कवर करने वाली बीमा योजना।',
      ml: 'കാലാവസ്ഥാ പാരാമീറ്ററുകൾ ഉപയോഗിച്ച് കാലാവസ്ഥാ സംബന്ധിയായ വിള നഷ്ടം കവർ ചെയ്യുന്ന ഇൻഷുറൻസ് പദ്ധതി.',
      te: 'వాతావరణ పారామీటర్లను ఉపయోగించి వాతావరణ సంబంధిత దిగుబడి నష్టాలను కవర్ చేసే బీమా పథకం.',
    },
    coverage: {
      en: 'Covers adverse weather conditions like drought, excess rainfall, temperature variations',
      hi: 'सूखा, अत्यधिक वर्षा, तापमान भिन्नता जैसी प्रतिकूल मौसम स्थितियों को कवर करता है',
      ml: 'വരൾച്ച, അമിത മഴ, താപനില വ്യതിയാനങ്ങൾ തുടങ്ങിയ പ്രതികൂല കാലാവസ്ഥാ സാഹചര്യങ്ങൾ കവർ ചെയ്യുന്നു',
      te: 'కరువు, అధిక వర్షపాతం, ఉష్ణోగ్రత వ్యత్యాసాలు వంటి ప్రతికూల వాతావరణ పరిస్థితులను కవర్ చేస్తుంది',
    },
    premium: {
      en: 'Variable premium based on crop type and weather risk assessment',
      hi: 'फसल प्रकार और मौसम जोखिम मूल्यांकन के आधार पर परिवर्तनीय प्रीमियम',
      ml: 'വിള തരവും കാലാവസ്ഥാ അപകടസാധ്യത വിലയിരുത്തലും അടിസ്ഥാനമാക്കി വേരിയബിൾ പ്രീമിയം',
      te: 'పంట రకం మరియు వాతావरణ ప్రమాద అంచనా ఆధారంగా వేరియబుల్ ప్రీమియం',
    },
    claimProcess: {
      en: 'Automatic trigger-based claims using weather station data',
      hi: 'मौसम स्टेशन डेटा का उपयोग करके स्वचालित ट्रिगर आधारित दावे',
      ml: 'കാലാവസ്ഥാ സ്റ്റേഷൻ ഡാറ്റ ഉപയോഗിച്ച് ഓട്ടോമാറ്റിക് ട്രിഗർ അടിസ്ഥാനമാക്കിയുള്ള ക്ലെയിമുകൾ',
      te: 'వాతావరణ స్టేషన్ డేటాను ఉపయోగించి ఆటోమేటిక్ ట్రిగ్గర్ ఆధారిత క్లెయిమ్‌లు',
    },
    eligibility: {
      en: 'All farmers in areas with adequate weather station coverage',
      hi: 'पर्याप्त मौसम स्टेशन कवरेज वाले क्षेत्रों में सभी किसान',
      ml: 'മതിയായ കാലാവസ്ഥാ സ്റ്റേഷൻ കവറേജുള്ള പ്രദേശങ്ങളിലെ എല്ലാ കർഷകരും',
      te: 'తగిన వాతావరణ స్టేషన్ కవరేజీ ఉన్న ప్రాంతాలలోని అందరు రైతులు',
    },
    documents: [
      {
        en: 'Farmer ID',
        hi: 'किसान आईडी',
        ml: 'കർഷക ഐഡി',
        te: 'రైతు ఐడి',
      },
      {
        en: 'Crop sowing details',
        hi: 'फसल बुवाई विवरण',
        ml: 'വിള വിതയ്ക്കൽ വിവരങ്ങൾ',
        te: 'పంట విత్తన వివరాలు',
      },
      {
        en: 'Bank account information',
        hi: 'बैंक खाता जानकारी',
        ml: 'ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ',
        te: 'బ్యాంక్ ఖాతా సమాచారం',
      },
    ],
    benefits: [
      {
        en: 'No field inspection required',
        hi: 'कोई क्षेत्र निरीक्षण आवश्यक नहीं',
        ml: 'ഫീൽഡ് പരിശോധന ആവശ്യമില്ല',
        te: 'ఫీల్డ్ తనిఖీ అవసరం లేదు',
      },
      {
        en: 'Quick claim processing',
        hi: 'त्वरित दावा प्रसंस्करण',
        ml: 'വേഗത്തിലുള്ള ക്ലെയിം പ്രോസസിംഗ്',
        te: 'వేగవంతమైన క్లెయిమ్ ప్రాసెసింగ్',
      },
      {
        en: 'Transparent and objective',
        hi: 'पारदर्शी और वस्तुनिष्ठ',
        ml: 'സുതാര്യവും വസ്തുനിഷ്ഠവും',
        te: 'పారదర్శక మరియు నిష్పక్షపాత',
      },
    ],
    contactInfo: {
      phone: '1800-180-1551',
      website: 'https://agricoop.nic.in',
    },
  },
  {
    id: 3,
    name: {
      en: 'Coconut Palm Insurance Scheme (CPIS)',
      hi: 'नारियल पाम बीमा योजना (सीपीआईएस)',
      ml: 'തെങ്ങ് പാം ഇൻഷുറൻസ് സ്കീം (സിപിഐഎസ്)',
      te: 'కొబ్బరి పామ్ ఇన్‌షురెన్స్ స్కీమ్ (సిపిఐఎస్)',
    },
    description: {
      en: 'Specialized insurance for coconut palm trees against natural calamities and diseases.',
      hi: 'प्राकृतिक आपदाओं और बीमारियों के खिलाफ नारियल के पेड़ों के लिए विशेष बीमा।',
      ml: 'പ്രകൃതി ദുരന്തങ്ങൾക്കും രോഗങ്ങൾക്കും എതിരായി തെങ്ങുകൾക്കുള്ള പ്രത്യേക ഇൻഷുറൻസ്.',
      te: 'ప్రకృతి వైపరీత్యాలు మరియు వ్యాధులకు వ్యతిరేకంగా కొబ్బరి చెట్లకు ప్రత్యేక బీమా.',
    },
    coverage: {
      en: 'Fire, lightning, cyclone, typhoon, hurricane, flood, inundation, landslide, earthquake',
      hi: 'आग, बिजली, चक्रवात, तूफान, बाढ़, जलमग्नता, भूस्खलन, भूकंप',
      ml: 'തീ, മിന്നൽ, ചുഴലിക്കാറ്റ്, ടൈഫൂൺ, ചുരുൾക്കാറ്റ്, വെള്ളപ്പൊക്കം, മണ്ണിടിച്ചിൽ, ഭൂകമ്പം',
      te: 'అగ్ని, మెరుపు, తుఫాను, హరికేన్, వరద, వరద ముంపు, కొండచరియలు, భూకంపం',
    },
    premium: {
      en: '9% of sum insured, subsidized to 50% for small and marginal farmers',
      hi: 'बीमा राशि का 9%, छोटे और सीमांत किसानों के लिए 50% सब्सिडी',
      ml: 'ഇൻഷുറൻസ് തുകയുടെ 9%, ചെറുകിട മാർജിനൽ കർഷകർക്ക് 50% സബ്സിഡി',
      te: 'బీమా మొత్తంలో 9%, చిన్న మరియు మార్జినల్ రైతులకు 50% సబ్సిడీ',
    },
    claimProcess: {
      en: 'Intimation → Joint survey → Assessment → Claim settlement within 30 days',
      hi: 'सूचना → संयुक्त सर्वेक्षण → मूल्यांकन → 30 दिनों के भीतर दावा निपटान',
      ml: 'അറിയിപ്പ് → സംയുക്ത സർവേ → വിലയിരുത്തൽ → 30 ദിവസത്തിനുള്ളിൽ ക്ലെയിം തീർപ്പാക്കൽ',
      te: 'సమాచారం → ఉమ్మడి సర్వే → అంచనా → 30 రోజుల్లోపు క్లెయిమ్ పరిష్కారం',
    },
    eligibility: {
      en: 'Coconut growers owning coconut gardens aged 4-60 years',
      hi: '4-60 साल की नारियल बागान के मालिक नारियल उत्पादक',
      ml: '4-60 വയസ്സുള്ള തെങ്ങിൻ തോട്ടങ്ങളുടെ ഉടമസ്ഥരായ തെങ്ങ് കർഷകർ',
      te: '4-60 సంవత్సరాల వయస్సు గల కొబ్బరి తోటల యజమానులు',
    },
    documents: [
      {
        en: 'Land ownership documents',
        hi: 'भूमि स्वामित्व दस्तावेज',
        ml: 'ഭൂമി ഉടമസ്ഥത രേഖകൾ',
        te: 'భూమి యాజమాన్య పత్రాలు',
      },
      {
        en: 'Age certificate of palms',
        hi: 'ताड़ का आयु प्रमाणपत्र',
        ml: 'തെങ്ങുകളുടെ പ്രായ സർട്ടിഫിക്കറ്റ്',
        te: 'తాళ వృక్షాల వయసు సర్టిఫికేట్',
      },
      {
        en: 'Previous insurance documents (if any)',
        hi: 'पिछले बीमा दस्तावेज (यदि कोई हो)',
        ml: 'മുൻ ഇൻഷുറൻസ് പ്രമാണങ്ങൾ (എന്തെങ്കിലും ഉണ്ടെങ്കിൽ)',
        te: 'మునుపటి బీమా పత్రాలు (ఏవైనా ఉంటే)',
      },
    ],
    benefits: [
      {
        en: 'Up to ₹6300 per palm compensation',
        hi: 'प्रति पाम ₹6300 तक मुआवजा',
        ml: 'ഓരോ തെങ്ങിനും ₹6300 വരെ നഷ്ടപരിഹాരം',
        te: 'ప్రతి తాటికి ₹6300 వరకు పరిహారం',
      },
      {
        en: 'Coverage for mature palms',
        hi: 'परिपक्व पामों के लिए कवरेज',
        ml: 'പക്വതയെത്തിയ തെങ്ങുകൾക്കുള്ള കവറേജ്',
        te: 'పరిపక్వ తాటి వృక్షాలకు కవరేజ్',
      },
      {
        en: 'Government subsidy available',
        hi: 'सरकारी सब्सिडी उपलब्ध',
        ml: 'സർക്കാർ സബ്സിഡി ലഭ്യം',
        te: 'ప్రభుత్వ సబ్సిడీ అందుబాటులో',
      },
    ],
    contactInfo: {
      phone: '011-23382691',
      website: 'https://coconutboard.gov.in',
    },
  },
];