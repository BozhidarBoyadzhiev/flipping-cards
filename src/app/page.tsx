'use client'

import { useState } from 'react'
import { 
  FlipCard3D, 
  AddCardModal, 
  CardListModal, 
  LoadingSpinner, 
  Button 
} from '@/components'
import { useCards, useCardNavigation } from '@/hooks'

export default function Home() {
  const { cards, loading, error, addCard, updateCard, deleteCard, refetch } = useCards()
  const { currentIndex, cardVersion, goToPrevious, goToNext, goToCard, incrementVersion } = useCardNavigation(cards.length)
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  const handleCardAdded = (newCard: any) => {
    addCard(newCard)
    goToCard(cards.length) // Go to the new card
  }

  const handleCardDeleted = (deletedId: number) => {
    deleteCard(deletedId)
  }

  const handleCardUpdated = (updatedCard: any) => {
    updateCard(updatedCard)
    incrementVersion()
  }

  const handleCardSelected = (index: number) => {
    goToCard(index)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner message="Loading flashcards..." />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">❌ {error}</p>
          <Button onClick={refetch}>
            Retry
          </Button>
        </div>
      </main>
    )
  }

  if (cards.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-white text-2xl font-bold mb-2">No flashcards yet</h2>
          <p className="text-gray-400 mb-6">Create your first card to get started!</p>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            size="lg"
          >
            + Create First Card
          </Button>
        </div>
        <AddCardModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCardAdded={handleCardAdded}
        />
      </main>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">

      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
          3D Language Flashcards 🎴✨
        </h1>
        <h5 className="text-2xl font-bold text-white mb-2">
          💡Click the card to flip it • 🖱️ Drag to rotate the view • 🔍Scroll to zoom in/out • ⌨️ Use arrow keys to navigate
        </h5>
      </div>
      
      {/* 3D Card */}
      <div className="w-full max-w-4xl">
        <FlipCard3D 
          key={`${currentCard.id}-${cardVersion}`} 
          card={currentCard}
          onCardUpdated={handleCardUpdated}
        />
      </div>

      {/* Navigation Controls */}
      <div className="mt-4 flex items-center gap-6">
        <Button
          onClick={goToPrevious}
          size="lg"
        >
          ← Previous
        </Button>

        <div className="text-white font-semibold text-center">
          <div className="text-3xl text-blue-400">{currentIndex + 1}</div>
          <div className="text-sm text-gray-500">of {cards.length}</div>
        </div>

        <Button
          onClick={goToNext}
          size="lg"
        >
          Next →
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 w-full max-w-2xl bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-300"
          style={{ 
            width: `${((currentIndex + 1) / cards.length) * 100}%` 
          }}
        />
      </div>

      {/* Action Buttons - Bottom Right */}
      <div className="text-center mt-2 flex gap-3 z-10">
        <Button
          onClick={() => setIsListModalOpen(true)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          View All ({cards.length})
        </Button>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="success"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Card
        </Button>
      </div>

      {/* Modals */}
      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCardAdded={handleCardAdded}
      />

      <CardListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        cards={cards}
        onCardDeleted={handleCardDeleted}
        onCardSelected={handleCardSelected}
        onCardUpdated={handleCardUpdated}
      />
    </main>
  )
}