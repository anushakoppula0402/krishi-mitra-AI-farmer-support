import type { CropBudget } from '../types';

export const budgetData: CropBudget[] = [
  {
    id: 1,
    cropName: {
      en: 'Rice (Kharif)',
      hi: 'चावल (खरीफ)',
      ml: 'നെല്ല് (ഖാരിഫ്)',
      te: 'వరి (ఖరీఫ్)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 4000, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 3500, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 6000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 2500, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 3000, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 5000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Threshing', hi: 'कटाई और गहाई', ml: 'കൊയ്ത്തും മെതിയും', te: 'పంటకోత & నూర్పిడి' }, cost: 7000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 25, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 2040, // per quintal
  },
  {
    id: 2,
    cropName: {
      en: 'Wheat (Rabi)',
      hi: 'गेहूँ (रबी)',
      ml: 'ഗോതമ്പ് (റബി)',
      te: 'గోధుమ (రబీ)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 3500, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 4000, icon: 'seed' },
      { item: { en: 'Fertilizers', hi: 'उर्वरक', ml: 'വളങ്ങൾ', te: 'ఎరువులు' }, cost: 5500, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 2000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 2500, icon: 'bug' },
      { item: { en: 'Irrigation (3-4 times)', hi: 'सिंचाई (3-4 बार)', ml: 'ജലസേചനം (3-4 തവണ)', te: 'నీటిపారుదల (3-4 సార్లు)' }, cost: 6000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Threshing', hi: 'कटाई और गहाई', ml: 'കൊയ്ത്തും മെതിയും', te: 'పంటకోత & నూర్పిడి' }, cost: 6500, icon: 'harvest' },
    ],
    estimatedYield: { amount: 20, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 2150, // per quintal
  },
  {
    id: 3,
    cropName: {
      en: 'Cotton (Kharif)',
      hi: 'कपास (खरीफ)',
      ml: 'പരുത്തി (ഖാരിഫ്)',
      te: 'పత్తి (ఖరీఫ్)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 5000, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 4500, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 8000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 3000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 6000, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 7000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Processing', hi: 'कटाई और प्रसंस्करण', ml: 'കൊയ്ത്തും സംസ്കരണവും', te: 'పంటకోత & ప్రాసెసింగ్' }, cost: 8000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 12, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 6200, // per quintal
  },
  {
    id: 4,
    cropName: {
      en: 'Maize (Kharif)',
      hi: 'मक्का (खरीफ)',
      ml: 'ചോളം (ഖാരിഫ്)',
      te: 'మొక్కజొన్న (ఖరీఫ్)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 3500, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 3000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 5500, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 2000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 3500, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 4000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Threshing', hi: 'कटाई और गहाई', ml: 'കൊയ്ത്തും മെതിയും', te: 'పంటకోత & నూర్పిడి' }, cost: 5500, icon: 'harvest' },
    ],
    estimatedYield: { amount: 28, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 1950, // per quintal
  },
  {
    id: 5,
    cropName: {
      en: 'Sugarcane',
      hi: 'गन्ना',
      ml: 'കരിമ്പ്',
      te: 'చెరుకు',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 6000, icon: 'tractor' },
      { item: { en: 'Seeds & Planting', hi: 'बीज और रोपण', ml: 'വിത്തും നടീലും', te: 'విత్తనాలు & నాటడం' }, cost: 8000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 12000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 3500, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചনം', te: 'నీటిపారుదల' }, cost: 15000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Transport', hi: 'कटाई और परिवहन', ml: 'കൊയ്ത്തും ഗതാഗതവും', te: 'పంటకోత & రవాణా' }, cost: 12000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 400, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 350, // per quintal
  },
  {
    id: 6,
    cropName: {
      en: 'Soybean (Kharif)',
      hi: 'सोयाबीन (खरीफ)',
      ml: 'സോയാബീൻ (ഖാരിഫ്)',
      te: 'సోయాబీన్ (ఖరీఫ్)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 3500, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 4000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 6000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 2500, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 5000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Threshing', hi: 'कटाई और गहाई', ml: 'കൊയ്ത്തും മെതിയും', te: 'పంటకోత & నూర్పిడి' }, cost: 6000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 18, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 5100, // per quintal
  },
  {
    id: 7,
    cropName: {
      en: 'Mustard (Rabi)',
      hi: 'सरसों (रबी)',
      ml: 'കടുക് (റബി)',
      te: 'ఆవాలు (రబీ)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 3000, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 2500, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 4500, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 1500, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 2500, icon: 'bug' },
      { item: { en: 'Irrigation (2-3 times)', hi: 'सिंचाई (2-3 बार)', ml: 'ജലസേചനം (2-3 തവണ)', te: 'నీటిపారుదల (2-3 సార్లు)' }, cost: 4000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Threshing', hi: 'कटाई और गहाई', ml: 'കൊയ്ത്തും മെതിയും', te: 'పంటకోత & నూర్పిడి' }, cost: 4500, icon: 'harvest' },
    ],
    estimatedYield: { amount: 12, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 5400, // per quintal
  },
  {
    id: 8,
    cropName: {
      en: 'Groundnut (Kharif)',
      hi: 'मूंगफली (खरीफ)',
      ml: 'നിലക്കടല (ഖാരിഫ്)',
      te: 'వేరుశెనగ (ఖరీఫ్)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 4000, icon: 'tractor' },
      { item: { en: 'Seeds & Sowing', hi: 'बीज और बुवाई', ml: 'വിത്തും വിതയും', te: 'విత్తనాలు & విత్తడం' }, cost: 5000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 6500, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 2500, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 3500, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 5500, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Processing', hi: 'कटाई और प्रसंस्करण', ml: 'കൊയ്ത്തും സംസ്കരണവും', te: 'పంటకోత & ప్రాసెసింగ్' }, cost: 6000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 15, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 5800, // per quintal
  },
  {
    id: 9,
    cropName: {
      en: 'Turmeric',
      hi: 'हल्दी',
      ml: 'മഞ്ഞൾ',
      te: 'పసుపు',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 8000, icon: 'tractor' },
      { item: { en: 'Rhizome & Planting', hi: 'राइज़ोम और रोपण', ml: 'റൈസോമും നടീലും', te: 'రైజోమ్ & నాటడం' }, cost: 15000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 12000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 5000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 10000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Processing', hi: 'कटाई और प्रसंस्करण', ml: 'കൊയ്ത്തും സംസ്കരണവും', te: 'పంటకోత & ప్రాసెసింగ్' }, cost: 15000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 25, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 7500, // per quintal
  },
  {
    id: 10,
    cropName: {
      en: 'Onion (Rabi)',
      hi: 'प्याज (रबी)',
      ml: 'ഉള്ളി (റബി)',
      te: 'ఉల్లిపాయ (రబీ)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 5000, icon: 'tractor' },
      { item: { en: 'Seeds & Transplanting', hi: 'बीज और रोपाई', ml: 'വിത്തും നടീലും', te: 'విత్తనాలు & మార్పిడి' }, cost: 8000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 10000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 5000, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 8000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Storage', hi: 'कटाई और भंडारण', ml: 'കൊയ്ത്തും സംഭരണവും', te: 'పంటకోత & నిల్వ' }, cost: 7000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 200, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 2200, // per quintal
  },
  {
    id: 11,
    cropName: {
      en: 'Potato (Rabi)',
      hi: 'आलू (रबी)',
      ml: 'ഉരുളക്കിഴങ്ങ് (റബി)',
      te: 'బంగాళాదుంప (రబీ)',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 4500, icon: 'tractor' },
      { item: { en: 'Seeds & Planting', hi: 'बीज और रोपण', ml: 'വിത്തും നടീലും', te: 'విత్తనాలు & నాటడం' }, cost: 12000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 8000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 3500, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേചനം', te: 'నీటిపారుదల' }, cost: 6000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Storage', hi: 'कटाई और भंडारण', ml: 'കൊയ്ത്തും സംഭരണവും', te: 'పంటకోత & నిల్వ' }, cost: 8000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 150, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 1800, // per quintal
  },
  {
    id: 12,
    cropName: {
      en: 'Tomato',
      hi: 'टमाटर',
      ml: 'തക്കാളി',
      te: 'టమోటా',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 5000, icon: 'tractor' },
      { item: { en: 'Seeds & Transplanting', hi: 'बीज और रोपाई', ml: 'വിത്തും നടീലും', te: 'విత్తనాలు & మార్పిడి' }, cost: 6000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 12000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 8000, icon: 'bug' },
      { item: { en: 'Irrigation & Drip System', hi: 'सिंचाई और ड्रिप सिस्टम', ml: 'ജലസേചനവും ഡ്രിപ്പ് സിസ്റ്റവും', te: 'నీటిపారుదల & డ్రిప్ సిస్టమ్' }, cost: 10000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Packaging', hi: 'कटाई और पैकेजिंग', ml: 'കൊയ്ത്തും പാക്കേജിംഗും', te: 'పంటకోత & ప్యాకేజింగ్' }, cost: 12000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 300, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 1500, // per quintal
  },
  {
    id: 13,
    cropName: {
      en: 'Chili (Red)',
      hi: 'लाल मिर्च',
      ml: 'ചുവന്ന മുളക്',
      te: 'ఎర్ర మిర్చి',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 4500, icon: 'tractor' },
      { item: { en: 'Seeds & Transplanting', hi: 'बीज और रोपाई', ml: 'വിത്തും നടീലും', te: 'విత్తనాలు & మార్పిడి' }, cost: 5500, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 10000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 3500, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 6000, icon: 'bug' },
      { item: { en: 'Irrigation & Mulching', hi: 'सिंचाई और मल्चिंग', ml: 'ജലസേചനവും മൾചിംഗും', te: 'నీటిపారుదల & మల్చింగ్' }, cost: 8000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Drying', hi: 'कटाई और सुखाना', ml: 'കൊയ്ത്തും ഉണക്കലും', te: 'పంటకోత & ఎండబెట్టడం' }, cost: 10000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 15, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 12000, // per quintal
  },
  {
    id: 14,
    cropName: {
      en: 'Ginger',
      hi: 'अदरक',
      ml: 'ഇഞ്ചി',
      te: 'అల్లం',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 6000, icon: 'tractor' },
      { item: { en: 'Rhizome & Planting', hi: 'राइज़ोम और रोपण', ml: 'റൈസോമും നടീലും', te: 'రైజోమ్ & నాటడం' }, cost: 18000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 12000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 5000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 4000, icon: 'bug' },
      { item: { en: 'Irrigation & Shade', hi: 'सिंचाई और छाया', ml: 'ജലസേചനവും നിഴലും', te: 'నీటిపారుదల & నీడ' }, cost: 10000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Processing', hi: 'कटाई और प्रसंस्करण', ml: 'കൊയ്ത്തും സംസ്കരണവും', te: 'పంటకోత & ప్రాసెసింగ్' }, cost: 12000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 80, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 6000, // per quintal
  },
  {
    id: 15,
    cropName: {
      en: 'Garlic',
      hi: 'लहसुन',
      ml: 'വെളുത്തുള്ളി',
      te: 'వెల్లుల్లి',
    },
    expenditure: [
      { item: { en: 'Land Preparation', hi: 'खेत की तैयारी', ml: 'നിലമൊരുക്കൽ', te: 'భూమి తయారీ' }, cost: 4000, icon: 'tractor' },
      { item: { en: 'Bulbs & Planting', hi: 'बल्ब और रोपण', ml: 'ബൾബുകളും നടീലും', te: 'బల్బులు & నాటడం' }, cost: 15000, icon: 'seed' },
      { item: { en: 'Fertilizers & Manures', hi: 'उर्वरक और खाद', ml: 'വളങ്ങളും ജൈവവളങ്ങളും', te: 'ఎరువులు & పశువుల ఎరువు' }, cost: 8000, icon: 'fertilizer' },
      { item: { en: 'Weed Management', hi: 'खरपतवार प्रबंधन', ml: 'കള നിയന്ത്രണം', te: 'కలుపు యాజమాన్యం' }, cost: 3000, icon: 'bug' },
      { item: { en: 'Pest & Disease Control', hi: 'कीट और रोग नियंत्रण', ml: 'കീട, രോഗ നിയന്ത്രണം', te: 'పురుగు & వ్యాధి నివారణ' }, cost: 3500, icon: 'bug' },
      { item: { en: 'Irrigation', hi: 'सिंचाई', ml: 'ജലസേচനം', te: 'నీటిపారుదల' }, cost: 6000, icon: 'waterDrop' },
      { item: { en: 'Harvesting & Curing', hi: 'कटाई और उपचार', ml: 'കൊയ്ത്തും ചികിത്സയും', te: 'పంటకోత & క్యూరింగ్' }, cost: 8000, icon: 'harvest' },
    ],
    estimatedYield: { amount: 50, unit: { en: 'Quintals', hi: 'क्विंटल', ml: 'ക്വിന്റൽ', te: 'క్వింటాళ్లు' } },
    estimatedPrice: 8000, // per quintal
  },
];