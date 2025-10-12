'use client'

import { useState } from 'react'
import { FlashCard } from '@/data/cards'
import { ModalWrapper, CardListItem, EmptyState, UpdateCardModal } from './'
import { deleteCard } from '@/utils'

interface CardListModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: FlashCard[];
  onCardDeleted: (id: number) => void;
  onCardSelected: (index: number) => void;
  onCardUpdated: (card: FlashCard) => void;
}

export default function CardListModal({ 
  isOpen, 
  onClose, 
  cards, 
  onCardDeleted,
  onCardSelected,
  onCardUpdated
}: CardListModalProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return
    }

    setDeletingId(id)

    try {
      await deleteCard(id);
      onCardDeleted(id)
    } catch (err) {
      console.error('Error deleting card:', err)
      alert('Failed to delete card. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }
  
  const [editingCard, setEditingCard] = useState<FlashCard | null>(null);

  const handleUpdate = (id: number) => {
    const cardToEdit = cards.find(card => card.id === id);

    if (cardToEdit) {
      setEditingCard(cardToEdit);
    }
  }

  const closeModal = () => {
    setEditingCard(null);
  };

  const handleCardUpdated = (updatedCard: FlashCard) => {
    onCardUpdated(updatedCard);
    closeModal();
  };

  const handleCardClick = (index: number) => {
    onCardSelected(index)
    onClose()
  }

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="All Cards"
    >
      {/* Subtitle */}
      <p className="text-gray-400 text-sm -mt-4 mb-6">
        {cards.length} {cards.length === 1 ? 'card' : 'cards'} total
      </p>

      {/* Card List */}
      <div className="max-h-[50vh] overflow-y-auto mb-6 pr-2 custom-scrollbar">
        {cards.length === 0 ? (
          <EmptyState
            title="No cards yet"
            description="Create your first card to get started!"
          />
        ) : (
          <div className="space-y-3">
            {cards.map((card, index) => (
              <CardListItem
                key={card.id}
                card={card}
                index={index}
                onCardClick={handleCardClick}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                isDeleting={deletingId === card.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        onClick={onClose}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        Close
      </button>
      {editingCard && (
        <UpdateCardModal 
          isOpen={true}
          onClose={closeModal}
          card={editingCard}
          onCardUpdated={handleCardUpdated}
        />
      )}
    </ModalWrapper>
  )
}