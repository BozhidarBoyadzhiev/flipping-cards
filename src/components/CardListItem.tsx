import { memo } from 'react';
import { FlashCard } from '@/data/cards';

interface CardListItemProps {
  card: FlashCard;
  index: number;
  onCardClick: (index: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  isDeleting: boolean;
}

const CardListItem = memo(function CardListItem({ 
  card, 
  index, 
  onCardClick, 
  onDelete,
  onUpdate,
  isDeleting 
}: CardListItemProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all group">
      <div className="flex items-start justify-between gap-4">
        {/* Card Content - Clickable */}
        <button
          onClick={() => onCardClick(index)}
          className="flex-1 text-left"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-blue-400 font-bold">#{index + 1}</span>
            {card.category && (
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                {card.category}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Front */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {card.frontLang}
              </p>
              <p className="text-white font-semibold">
                {card.front}
              </p>
            </div>
            
            {/* Arrow */}
            <div className="flex items-center">
              <span className="text-gray-600 mx-2">→</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {card.backLang}
                </p>
                <p className="text-green-300 font-semibold">
                  {card.back}
                </p>
              </div>
            </div>
          </div>
        </button>

        {/* Update Button */}
        <button
          onClick={() => onUpdate(card.id)}
          className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-colors disabled:opacity-50"
          title="Update card">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(card.id)}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
          title="Delete card"
        >
          {isDeleting ? (
            <div className="animate-spin h-5 w-5 border-2 border-red-400 border-t-transparent rounded-full"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
});

export default CardListItem