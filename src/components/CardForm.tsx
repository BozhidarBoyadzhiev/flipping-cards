import { useState } from 'react';
import Button from './ui/Button';
import LoadingSpinner from './LoadingSpinner';
import { FormSelect } from './ui/form/FormSelect';
import { languageOptions, type LanguageOption } from '@/data/languages';
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
        <div className="space-y-2">
          <label htmlFor="frontText" className="block text-sm font-semibold text-gray-300">
            Front Text
          </label>
          <textarea
            id="frontText"
            className="w-full p-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            disabled={loading}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <FormSelect<LanguageOption>
            label="Front Language"
            value={getFrontLangDefault()}
            options={languageOptions}
            isDisabled={loading}
            onChange={(option) => setFrontLang(option?.value || 'English')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="backText" className="block text-sm font-semibold text-gray-300">
            Back Text
          </label>
          <input
            id="backText"
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="e.g., Xin chào"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <FormSelect<LanguageOption>
            label="Back Language"
            value={getBackLangDefault()}
            options={languageOptions}
            isDisabled={loading}
            onChange={(option) => setBackLang(option?.value || 'Vietnamese')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-300">
            Category <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., greetings, food"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            disabled={loading}
          />
        </div>        <div className="flex gap-3 pt-4">
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