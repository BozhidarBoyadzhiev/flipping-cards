import { useState } from 'react';
import { ModalWrapper } from './';
import { LanguageOption, languageOptions } from '@/data/languages';
import { FormSelect, RadioGroup, RadioOption } from './ui/form';
import { ExportModalProps, FlashCard } from '@/types';

type ExportType = 'all' | 'specific';
type LanguageFilterMode = 'either' | 'front' | 'back';

const LANGUAGE_FILTER_OPTIONS: { value: LanguageFilterMode; label: string }[] = [
  { value: 'either', label: 'Front & Back Languages' },
  { value: 'front', label: 'Front Language Only' },
  { value: 'back', label: 'Back Language Only' },
];

export default function ExportModal({ 
  isOpen, 
  onClose,
  cards
}: ExportModalProps) {
  const [exportType, setExportType] = useState<ExportType>('all');
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageOption[]>([]);
  const [languageFilterMode, setLanguageFilterMode] = useState<LanguageFilterMode>('either');

  const handleExport = () => {
    if (exportType === 'specific' && selectedLanguages.length === 0) {
      alert('Please select at least one language');
      return;
    }

    let cardsToExport: FlashCard[];

    if (exportType === 'specific') {
      // Convert selected languages to lowercase for case-insensitive comparison
      const selectedLanguageValues = selectedLanguages.map(lang => lang.value.toLowerCase());
      
      console.log('Selected languages:', selectedLanguageValues);
      
      cardsToExport = cards.filter(card => {
        // Convert card languages to lowercase for comparison
        const frontLang = (card.frontLang || '').toLowerCase();
        const backLang = (card.backLang || '').toLowerCase();
        
        console.log('Checking card:', { 
          front: card.front,
          frontLang,
          back: card.back,
          backLang
        });

        let matches = false;
        switch (languageFilterMode) {
          case 'either':
            matches = selectedLanguageValues.includes(frontLang) || 
                     selectedLanguageValues.includes(backLang);
            break;
          case 'front':
            matches = selectedLanguageValues.includes(frontLang);
            break;
          case 'back':
            matches = selectedLanguageValues.includes(backLang);
            break;
        }
        
        console.log('Card matches filter:', matches);
        return matches;
      });
    } else {
      cardsToExport = cards;
    }

    if (cardsToExport.length === 0) {
      alert('No cards to export for the selected criteria.');
      return;
    }

    const simplifiedCards = cardsToExport.map(({ front, back, frontLang, backLang, category }) => ({
      front,
      frontLang,
      back,
      backLang,
      category
    }));

    const exportData = {
      exportDetails: {
        type: exportType,
        languages: exportType === 'specific' ? selectedLanguages.map(lang => lang.value) : ['all'],
        filterMode: exportType === 'specific' ? languageFilterMode : 'none'
      },
      cards: simplifiedCards
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "flashcards_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="📤 Export to JSON">
      <div className="space-y-6">
        <RadioGroup label="Export Options">
          <RadioOption
            name="exportType"
            value="all"
            label="Export all cards"
            checked={exportType === 'all'}
            onChange={(e) => setExportType(e.target.value as ExportType)}
          />
          <RadioOption
            name="exportType"
            value="specific"
            label="Export specific languages"
            checked={exportType === 'specific'}
            onChange={(e) => setExportType(e.target.value as ExportType)}
          />
        </RadioGroup>

        {exportType === 'specific' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
            <FormSelect<LanguageOption, true>
              label="Select Languages"
              isMulti
              value={selectedLanguages}
              options={languageOptions}
              onChange={(newValue) => setSelectedLanguages([...newValue])}
              placeholder="Choose one or more languages..."
            />

            <RadioGroup label="Language Filter Mode">
              {LANGUAGE_FILTER_OPTIONS.map(({ value, label }) => (
                <RadioOption
                  key={value}
                  name="languageFilterMode"
                  value={value}
                  label={label}
                  checked={languageFilterMode === value}
                  onChange={(e) => setLanguageFilterMode(e.target.value as LanguageFilterMode)}
                />
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}