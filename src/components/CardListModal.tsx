'use client'

import { useState } from 'react'
import { FlashCard } from '@/data/cards'

interface CardListModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: FlashCard[];
  onCardDeleted: (id: number) => void;
  onCardSelected: (index: number) => void;
}

export default function CardListModal({ 
  isOpen, 
  onClose, 
  cards, 
  onCardDeleted,
  onCardSelected 
}: CardListModalProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  if (!isOpen) return null

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete card')
      }

      onCardDeleted(id)
    } catch (err) {
      console.error('Error deleting card:', err)
      alert('Failed to delete card. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleCardClick = (index: number) => {
    onCardSelected(index)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">All Cards</h2>
            <p className="text-gray-400 text-sm mt-1">
              {cards.length} {cards.length === 1 ? 'card' : 'cards'} total
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Card List */}
        <div className="flex-1 overflow-y-auto p-6">
          {cards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No cards yet</p>
              <p className="text-gray-500 text-sm mt-2">Create your first card to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Card Content - Clickable */}
                    <button
                      onClick={() => handleCardClick(index)}
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

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(card.id)}
                      disabled={deletingId === card.id}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete card"
                    >
                      {deletingId === card.id ? (
                        <div className="animate-spin h-5 w-5 border-2 border-red-400 border-t-transparent rounded-full"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}