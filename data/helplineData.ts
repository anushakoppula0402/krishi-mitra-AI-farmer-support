import type { HelplineInfo, StateAuthority, AgriculturalOffice } from '../types';

export const nationalHelplines: HelplineInfo[] = [
  {
    name: 'Kisan Call Center',
    number: '1800-180-1551',
    description: {
      en: 'A nationwide toll-free service for farmers to get answers to their queries on agriculture and allied sectors.',
      hi: 'किसानों के लिए कृषि और संबद्ध क्षेत्रों पर उनके प्रश्नों के उत्तर पाने के लिए एक राष्ट्रव्यापी टोल-फ्री सेवा।',
      ml: 'കർഷകർക്ക് കൃഷിയെയും അനുബന്ധ മേഖലകളെയും കുറിച്ചുള്ള ചോദ്യങ്ങൾക്ക് ഉത്തരം ലഭിക്കുന്നതിനുള്ള ഒരു രാജ്യവ്യാപക ടോൾ ഫ്രീ സേവനം.',
      te: 'రైతులు వ్యవసాయం మరియు అనుబంధ రంగాలపై వారి ప్రశ్నలకు సమాధానాలు పొందడానికి దేశవ్యాప్త టోల్-ఫ్రీ సేవ.',
    },
  },
  {
    name: 'National Fertilizers Limited',
    number: '1800-111-345',
    description: {
      en: 'Helpline for inquiries related to fertilizers, soil health, and crop nutrition.',
      hi: 'उर्वरकों, मिट्टी के स्वास्थ्य और फसल पोषण से संबंधित पूछताछ के लिए हेल्पलाइन।',
      ml: 'വളങ്ങൾ, മണ്ണിന്റെ ആരോഗ്യം, വിള പോഷണം എന്നിവയുമായി ബന്ധപ്പെട്ട അന്വേഷണങ്ങൾക്കുള്ള ഹെൽപ്പ് ലൈൻ.',
      te: 'ఎరువులు, నేల ఆరోగ్యం మరియు పంట పోషణకు సంబంధించిన విచారణల కోసం హెల్ప్‌లైన్.',
    },
  },
];

export const stateAuthorities: StateAuthority[] = [
  {
    state: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', ml: 'ഉത്തർ പ്രദേശ്', te: 'ఉత్తర ప్రదేశ్' },
    department: { en: 'Department of Agriculture', hi: 'कृषि विभाग', ml: 'കൃഷി വകുപ്പ്', te: 'వ్యవసాయ శాఖ' },
    number: '0522-2205874',
  },
  {
    state: { en: 'Maharashtra', hi: 'महाराष्ट्र', ml: 'മഹാരാഷ്ട്ര', te: 'మహారాష్ట్ర' },
    department: { en: 'Department of Agriculture', hi: 'कृषि विभाग', ml: 'കൃഷി വകുപ്പ്', te: 'వ్యవసాయ శాఖ' },
    number: '020-26123596',
  },
  {
    state: { en: 'Kerala', hi: 'केरल', ml: 'കേരളം', te: 'కేరళ' },
    department: { en: 'Department of Agriculture Development and Farmers\' Welfare', hi: 'कृषि विकास और किसान कल्याण विभाग', ml: 'കൃഷി വികസന കർഷകക്ഷേമ വകുപ്പ്', te: 'వ్యవసాయ అభివృద్ధి మరియు రైతుల సంక్షేమ శాఖ' },
    number: '0471-2304653',
  },
  {
    state: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश', ml: 'ആന്ധ്രാ പ്രദേശ്', te: 'ఆంధ్ర ప్రదేశ్' },
    department: { en: 'Department of Agriculture', hi: 'कृषि विभाग', ml: 'കൃഷി വകുപ്പ്', te: 'వ్యవసాయ శాఖ' },
    number: '0863-2217520',
  },
  {
    state: { en: 'Punjab', hi: 'पंजाब', ml: 'പഞ്ചാബ്', te: 'పంజాబ్' },
    department: { en: 'Department of Agriculture & Farmers\' Welfare', hi: 'कृषि और किसान कल्याण विभाग', ml: 'കൃഷി, കർഷകക്ഷേമ വകുപ്പ്', te: 'వ్యవసాయ & రైతుల సంక్షేమ శాఖ' },
    number: '0172-2970605',
  },
];

export const agriculturalOffices: AgriculturalOffice[] = [
    {
        state: 'Kerala',
        district: { en: 'Thiruvananthapuram', hi: 'तिरुवनंतपुरम', ml: 'തിരുവനന്തപുരം', te: 'తిరువనంతపురం' },
        name: { en: 'Principal Agricultural Office', hi: 'प्रधान कृषि कार्यालय', ml: 'പ്രിൻസിപ്പൽ കൃഷി ഓഫീസ്', te: 'ప్రిన్సిపల్ వ్యవసాయ కార్యాలయం' },
        address: { en: 'Vikas Bhavan, Thiruvananthapuram', hi: 'विकास भवन, तिरुवनंतपुरम', ml: 'വികാസ് ഭവൻ, തിരുവനന്തപുരം', te: 'వికాస్ భవన్, తిరువనంతపురం' },
        contact: '0471-2304481'
    },
    {
        state: 'Kerala',
        district: { en: 'Ernakulam', hi: 'एर्नाकुलम', ml: 'എറണാകുളം', te: 'ఎర్నాకుళం' },
        name: { en: 'Principal Agricultural Office', hi: 'प्रधान कृषि कार्यालय', ml: 'പ്രിൻസിപ്പൽ കൃഷി ഓഫീസ്', te: 'ప్రిన్సిపల్ వ్యవసాయ కార్యాలయం' },
        address: { en: 'Civil Station, Kakkanad, Ernakulam', hi: 'सिविल स्टेशन, काक्कनाड, एर्नाकुलम', ml: 'സിവിൽ സ്റ്റേഷൻ, കാക്കനാട്, എറണാകുളം', te: 'సివిల్ స్టేషన్, కాక్కనాడ్, ఎర్నాకుళం' },
        contact: '0484-2422204'
    },
    {
        state: 'Uttar Pradesh',
        district: { en: 'Lucknow', hi: 'लखनऊ', ml: 'ലഖ്‌നൗ', te: 'లక్నో' },
        name: { en: 'District Agriculture Office', hi: 'जिला कृषि कार्यालय', ml: 'ജില്ലാ കൃഷി ഓഫീസ്', te: 'జిల్లా వ్యవసాయ కార్యాలయం' },
        address: { en: 'Krishi Bhawan, Lucknow', hi: 'कृषि भवन, लखनऊ', ml: 'കൃഷി ഭവൻ, ലഖ്‌നൗ', te: 'కృషి భవన్, లక్నో' },
        contact: '0522-2207961'
    },
    {
        state: 'Uttar Pradesh',
        district: { en: 'Varanasi', hi: 'वाराणसी', ml: 'വാരാണസി', te: 'వారణాసి' },
        name: { en: 'Deputy Director of Agriculture Office', hi: 'उप कृषि निदेशक कार्यालय', ml: 'ഡെപ്യൂട്ടി ഡയറക്ടർ ഓഫ് അഗ്രികൾച്ചർ ഓഫീസ്', te: 'డిప్యూటీ డైరెక్టర్ ఆఫ్ అగ్రికల్చర్ ఆఫీస్' },
        address: { en: 'Varanasi Division, Varanasi', hi: 'वाराणसी मंडल, वाराणसी', ml: 'വാരാണസി ഡിവിഷൻ, വാരാണസി', te: 'వారణాసి డివిజన్, వారణాసి' },
        contact: '0542-2502325'
    },
];