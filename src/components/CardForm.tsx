import { useState } from 'react';
import Select from 'react-select';
import { dropdownStyle } from '@/utils';
import { LanguageOption, languageOptions } from '@/data/languages';
import { FlashCard } from '@/data/cards';
import { AddMultipleCardsModal } from '.';

interface CardFormProps {
  initialData?: FlashCard;
  onSubmit: (card: Omit<FlashCard, 'id'>) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  submitButtonText: string;
  submitButtonColor: 'blue' | 'purple';
  showAddMultiple?: boolean;
}

export default function CardForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading, 
  error,
  submitButtonText,
  submitButtonColor,
  showAddMultiple
}: CardFormProps) {
  const [front, setFront] = useState(initialData?.front || '');
  const [back, setBack] = useState(initialData?.back || '');
  const [frontLang, setFrontLang] = useState(initialData?.frontLang || 'English');
  const [backLang, setBackLang] = useState(initialData?.backLang || 'Vietnamese');
  const [category, setCategory] = useState(initialData?.category || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ front, back, frontLang, backLang, category });
  };

  const getFrontLangDefault = () => {
    return languageOptions.find(opt => opt.value === frontLang) || languageOptions[0];
  };

  const getBackLangDefault = () => {
    return languageOptions.find(opt => opt.value === backLang) || languageOptions[3];
  };

  const buttonColorClass = submitButtonColor === 'blue' 
    ? 'bg-blue-500 hover:bg-blue-600' 
    : 'bg-purple-500 hover:bg-purple-600';

  return (
    <>
      {error && (
        <div className="mb-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Front Text
          </label>
          <input
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="e.g., Hello"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Front Language
          </label>
          <Select<LanguageOption>
            value={getFrontLangDefault()}
            options={languageOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            isDisabled={loading}
            styles={dropdownStyle}
            onChange={(option) => setFrontLang(option?.value || 'English')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Back Text
          </label>
          <input
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="e.g., Xin chào"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Back Language
          </label>
          <Select<LanguageOption>
            value={getBackLangDefault()}
            options={languageOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            isDisabled={loading}
            styles={dropdownStyle}
            onChange={(option) => setBackLang(option?.value || 'Vietnamese')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Category <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., greetings, food"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            disabled={loading}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 ${buttonColorClass} text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={loading}
          >
            {submitButtonText}
          </button>
          {showAddMultiple && (
                      <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className={`flex-1 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={loading}
          >
            Add multiple
          </button>
          )}
        </div>
      </form>
      <AddMultipleCardsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}