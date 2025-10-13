'use client'

import { useState } from 'react'
import { 
  FlipCard3D, 
  AddCardModal, 
  CardListModal, 
  LoadingSpinner, 
  Button,
  SettingsModal
} from '@/components'
import { useCards, useCardNavigation } from '@/hooks'
import { useSettings } from '@/hooks/useSettings'

export default function Home() {
  const { cards, loading, error, addCard, updateCard, deleteCard, refetch } = useCards()
  const { currentIndex, cardVersion, goToPrevious, goToNext, goToCard, incrementVersion } = useCardNavigation(cards.length)
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const { settings, updateSettings } = useSettings()

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

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
      />

      {/* Header */}
      <div className="mb-6 text-center w-full max-w-4xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            3D Language Flashcards 🎴
          </h1>
          <div className="flex-1 flex justify-end">
            <Button
              onClick={() => setIsSettingsModalOpen(true)}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
            💡 Click to flip
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
            🖱️ Drag to rotate
          </span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
            🔍 Scroll to zoom
          </span>
          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
            ⌨️ Arrow keys
          </span>
          {settings.rightClickEditEnabled && (
            <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/30" title="Right-click a card to edit it">
              🖱️ Right-click to edit
            </span>
          )}
        </div>
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