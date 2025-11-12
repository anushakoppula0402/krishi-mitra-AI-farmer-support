import type { CropCalendar } from '../types';

export const cropCalendarData: CropCalendar[] = [
  {
    id: 1,
    cropName: {
      en: 'Rice (Kharif)',
      hi: 'चावल (खरीफ)',
      ml: 'നെല്ല് (ഖാരിഫ്)',
      te: 'వరి (ఖరీఫ్)',
    },
    season: 'Kharif',
    stages: [
      {
        name: { en: 'Nursery Raising', hi: 'नर्सरी तैयार करना', ml: 'നഴ്സറി തയ്യാറാക്കൽ', te: 'నారుమడి పెంచడం' },
        timing: { en: 'June - July', hi: 'जून - जुलाई', ml: 'ജൂൺ - ജൂലൈ', te: 'జూన్ - జూలై' },
      },
      {
        name: { en: 'Transplanting', hi: 'रोपाई', ml: 'ഞാറ് നടീൽ', te: 'నాట్లు వేయడం' },
        timing: { en: 'July - August', hi: 'जुलाई - अगस्त', ml: 'ജൂലൈ - ഓഗസ്റ്റ്', te: 'జూలై - ఆగస్టు' },
      },
      {
        name: { en: 'Vegetative Growth', hi: 'वानस्पतिक वृद्धि', ml: 'വളർച്ചാ ഘട്ടം', te: 'శాఖీయ పెరుగుదల' },
        timing: { en: 'August - September', hi: 'अगस्त - सितंबर', ml: 'ഓഗസ്റ്റ് - സെപ്റ്റംബർ', te: 'ఆగస్టు - సెప్టెంబర్' },
      },
      {
        name: { en: 'Flowering & Grain Filling', hi: 'फूल आना और दाना भरना', ml: 'പൂവിടലും കതിരുപിടിക്കലും', te: 'పూత మరియు గింజ నింపడం' },
        timing: { en: 'October', hi: 'अक्टूबर', ml: 'ഒക്ടോബർ', te: 'అక్టోబర్' },
      },
      {
        name: { en: 'Harvesting', hi: 'कटाई', ml: 'വിളവെടുപ്പ്', te: 'పంట కోత' },
        timing: { en: 'November - December', hi: 'नवंबर - दिसंबर', ml: 'നവംബർ - ഡിസംബർ', te: 'నవంబర్ - డిసెంబర్' },
      },
    ],
  },
  {
    id: 2,
    cropName: {
      en: 'Wheat (Rabi)',
      hi: 'गेहूँ (रबी)',
      ml: 'ഗോതമ്പ് (റബി)',
      te: 'గోధుమ (రబీ)',
    },
    season: 'Rabi',
    stages: [
       {
        name: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమిని సిద్ధం చేయడం' },
        timing: { en: 'October', hi: 'अक्टूबर', ml: 'ഒക്ടോബർ', te: 'అక్టోబర్' },
      },
      {
        name: { en: 'Sowing', hi: 'बुवाई', ml: 'വിതയ്ക്കൽ', te: 'విత్తడం' },
        timing: { en: 'November', hi: 'नवंबर', ml: 'നവംബർ', te: 'నవంబర్' },
      },
      {
        name: { en: 'Germination & Crown Root Initiation', hi: 'अंकुरण और क्राउन रूट दीक्षा', ml: 'മുളയ്ക്കലും വേരുപിടിക്കലും', te: 'అంకురోత్పత్తి మరియు పిలక వేర్లు రావడం' },
        timing: { en: 'December', hi: 'दिसंबर', ml: 'ഡിസംബർ', te: 'డిసెంబర్' },
      },
      {
        name: { en: 'Tillering & Jointing', hi: 'टिलरिंग और जॉइंटिंग', ml: 'ചിനപ്പ് പൊട്ടലും വളർച്ചയും', te: 'పిలకలు వేయడం మరియు కణుపులు ఏర్పడటం' },
        timing: { en: 'January', hi: 'जनवरी', ml: 'ജനുവരി', te: 'జనవరి' },
      },
      {
        name: { en: 'Flowering & Milking Stage', hi: 'फूल आना और दूधिया अवस्था', ml: 'പൂവിടലും പാൽ നിറയലും', te: 'పూత మరియు పాల దశ' },
        timing: { en: 'February', hi: 'फरवरी', ml: 'ഫെബ്രുവരി', te: 'ఫిబ్రవరి' },
      },
      {
        name: { en: 'Harvesting', hi: 'कटाई', ml: 'വിളവെടുപ്പ്', te: 'పంట కోత' },
        timing: { en: 'March - April', hi: 'मार्च - अप्रैल', ml: 'മാർച്ച് - ഏപ്രിൽ', te: 'మార్చి - ఏప్రిల్' },
      },
    ],
  },
  {
    id: 3,
    cropName: {
      en: 'Cotton',
      hi: 'कपास',
      ml: 'പരുത്തി',
      te: 'పత్తి',
    },
    season: 'Kharif',
    stages: [
       {
        name: { en: 'Sowing', hi: 'बुवाई', ml: 'വിതയ്ക്കൽ', te: 'విత్తడం' },
        timing: { en: 'May - June', hi: 'मई - जून', ml: 'മെയ് - ജൂൺ', te: 'మే - జూన్' },
      },
      {
        name: { en: 'Seedling Stage', hi: 'अंकुरण अवस्था', ml: 'തൈ ഘട്ടം', te: 'నారు దశ' },
        timing: { en: 'June', hi: 'जून', ml: 'ജൂൺ', te: 'జూన్' },
      },
      {
        name: { en: 'Vegetative Growth (Squaring)', hi: 'वानस्पतिक वृद्धि', ml: 'വളർച്ചാ ഘട്ടം', te: 'శాఖీయ పెరుగుదల' },
        timing: { en: 'July - August', hi: 'जुलाई - अगस्त', ml: 'ജൂലൈ - ഓഗസ്റ്റ്', te: 'జూలై - ఆగస్టు' },
      },
      {
        name: { en: 'Flowering & Boll Development', hi: 'फूल आना और बोल विकास', ml: 'പൂവിടലും കായ പിടിക്കലും', te: 'పూత మరియు కాయ అభివృద్ధి' },
        timing: { en: 'August - October', hi: 'अगस्त - अक्टूबर', ml: 'ഓഗസ്റ്റ് - ഒക്ടോബർ', te: 'ఆగస్టు - అక్టోబర్' },
      },
      {
        name: { en: 'Boll Bursting & Picking', hi: 'बोल फटना और चुनाई', ml: 'കായ പൊട്ടലും പരുത്തി എടുക്കലും', te: 'కాయ పగలడం మరియు ఏరడం' },
        timing: { en: 'October - January', hi: 'अक्टूबर - जनवरी', ml: 'ഒക്ടോബർ - ജനുവരി', te: 'అక్టోబర్ - జనవరి' },
      },
    ],
  },
];