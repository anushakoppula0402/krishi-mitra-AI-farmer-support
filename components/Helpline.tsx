import React, { useState, useMemo } from 'react';
import { nationalHelplines, stateAuthorities, agriculturalOffices } from '../data/helplineData';
import type { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface HelplineProps {
  onClose: () => void;
  language: Language;
}

const Helpline: React.FC<HelplineProps> = ({ onClose, language }) => {
  const uiText = UI_STRINGS[language.code].helpline;
  const langCode = language.code;

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const states = useMemo(() => {
    return [...new Set(agriculturalOffices.map(office => office.state))];
  }, []);

  const districts = useMemo(() => {
    if (!selectedState) return [];
    const districtNames = agriculturalOffices
      .filter(office => office.state === selectedState)
      .map(office => office.district[langCode]);
    return [...new Set(districtNames)];
  }, [selectedState, langCode]);

  const filteredOffices = useMemo(() => {
    if (!selectedState || !selectedDistrict) return [];
    return agriculturalOffices.filter(office => 
      office.state === selectedState && office.district[langCode] === selectedDistrict
    );
  }, [selectedState, selectedDistrict, langCode]);
  
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedState(e.target.value);
      setSelectedDistrict(''); // Reset district when state changes
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="helpline-title">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="helpline-title" className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600" aria-label="Close helpline window">
            <Icon name="close" className="w-7 h-7" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto bg-gray-50">
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{uiText.nationalHelplines}</h3>
            <div className="space-y-4">
              {nationalHelplines.map((helpline) => (
                <div key={helpline.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-lg text-green-700">{helpline.name}</h4>
                  <p className="text-gray-600 my-2">{helpline.description[langCode]}</p>
                  <a href={`tel:${helpline.number}`} className="inline-flex items-center gap-2 text-blue-600 font-mono text-lg hover:underline">
                    <Icon name="helpline" className="w-5 h-5" />
                    {helpline.number}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{uiText.nearbyOffices}</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-1">{uiText.selectState}</label>
                        <select id="state-select" value={selectedState} onChange={handleStateChange} className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="">-- {uiText.selectState} --</option>
                            {states.map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="district-select" className="block text-sm font-medium text-gray-700 mb-1">{uiText.selectDistrict}</label>
                         <select id="district-select" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedState} className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100">
                            <option value="">-- {uiText.selectDistrict} --</option>
                            {districts.map(district => <option key={district} value={district}>{district}</option>)}
                        </select>
                    </div>
                </div>
                {filteredOffices.length > 0 && (
                    <div className="space-y-3 mt-4">
                        {filteredOffices.map(office => (
                            <div key={office.name.en} className="p-3 border rounded-md bg-green-50">
                                <h4 className="font-bold text-md text-green-800">{office.name[langCode]}</h4>
                                <p className="text-sm text-gray-600">{office.address[langCode]}</p>
                                <a href={`tel:${office.contact}`} className="text-blue-600 font-mono text-sm hover:underline">{office.contact}</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{uiText.stateAuthorities}</h3>
            <div className="space-y-3">
               <div className="grid grid-cols-3 gap-4 px-4 py-2 font-bold text-gray-600 bg-gray-100 rounded-t-lg">
                <span>{uiText.region}</span>
                <span>{uiText.department}</span>
                <span className="text-right">{uiText.contact}</span>
              </div>
              {stateAuthorities.map((authority) => (
                <div key={authority.state.en} className="grid grid-cols-3 gap-4 p-4 bg-white border rounded-lg shadow-sm items-center">
                  <span className="font-semibold text-gray-800">{authority.state[langCode]}</span>
                  <span className="text-gray-700 text-sm">{authority.department[langCode]}</span>
                  <a href={`tel:${authority.number}`} className="text-blue-600 font-mono text-right hover:underline justify-self-end">
                    {authority.number}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Helpline;