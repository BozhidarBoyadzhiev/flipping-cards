'use client'

import { useState } from 'react'
import { 
  FlipCard3D, 
  AddCardModal, 
  CardListModal, 
  LoadingSpinner, 
  Button,
  SettingsModal,
  ExportModal
} from '@/components'
import { useCards, useCardNavigation } from '@/hooks'
import { useSettings } from '@/hooks/useSettings'
import type { FlashCard } from '@/types/cards'

export default function Home() {
  const { cards, loading, error, addCard, updateCard, deleteCard, refetch } = useCards()
  const { currentIndex, cardVersion, goToPrevious, goToNext, goToCard, incrementVersion } = useCardNavigation(cards.length)
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const { settings, updateSettings } = useSettings()

  const handleCardAdded = (newCard: FlashCard) => {
    addCard(newCard)
    goToCard(cards.length)
  }

  const handleCardDeleted = (deletedId: number) => {
    deleteCard(deletedId)
  }

  const handleCardUpdated = (updatedCard: FlashCard) => {
    updateCard(updatedCard)
    incrementVersion()
  }

  const handleCardSelected = (index: number) => {
    goToCard(index)
  }

  const exportCards = () => {
    setIsExportModalOpen(true)
  }

  if (loading) {
    return (
      <main className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner message="Loading flashcards..." />
      </main>
    )
  }

  if (error) {
    return (
      <main className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-3">❌ {error}</p>
          <Button onClick={refetch} size="sm">Retry</Button>
        </div>
      </main>
    )
  }

  if (cards.length === 0) {
    return (
      <main className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-3">📚</div>
          <h2 className="text-white text-xl font-bold mb-2">No flashcards yet</h2>
          <p className="text-gray-400 text-sm mb-4">Create your first card to get started!</p>
          <Button onClick={() => setIsAddModalOpen(true)} size="sm">
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
    <main className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
      />
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        cards={cards}
      />
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

      {/* Compact Grid Layout */}
      <div className="lg:h-full grid grid-rows-[auto_1fr_auto] gap-2 p-3 md:p-4 lg:p-6">
        
        {/* Header Row - Compact */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white truncate">
            🎴 3D Flashcards
          </h1>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            <Button
              onClick={() => setIsSettingsModalOpen(true)}
              variant="secondary"
              size="sm"
              className="px-2 py-1 text-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
            <Button
              onClick={exportCards}
              variant="secondary"
              size="sm"
              className="px-2 py-1 text-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Main Content Row - Card & Controls */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-2 lg:gap-3 min-h-0">
          
          {/* Card Area */}
          <div className="flex flex-col items-center justify-center min-h-0 flex-1">
            <div className="w-full max-w-2xl">
              <FlipCard3D 
                key={`${currentCard.id}-${cardVersion}`} 
                card={currentCard}
                onCardUpdated={handleCardUpdated}
              />
            </div>
          </div>

          {/* Mobile Navigation - Below Card */}
          <div className="lg:hidden flex items-center justify-between gap-2 px-2">
            <Button
              onClick={goToPrevious}
              size="sm"
              className="px-3 py-1.5"
            >
              ← Prev
            </Button>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-1 border border-gray-700/50">
              <span className="text-lg font-bold text-blue-400">{currentIndex + 1}</span>
              <span className="text-sm text-gray-400 mx-1">/</span>
              <span className="text-lg font-bold text-blue-400">{cards.length}</span>
            </div>

            <Button
              onClick={goToNext}
              size="sm"
              className="px-3 py-1.5"
            >
              Next →
            </Button>
          </div>

          {/* Desktop Side Panel - Navigation & Info */}
          <div className="hidden lg:flex lg:w-48 flex-col items-center justify-center h-full">
            <div className="flex flex-col items-stretch gap-3">
              {/* Card Counter */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-gray-700/50 shadow-lg">
                <div className="text-3xl font-bold text-blue-400">{currentIndex + 1}</div>
                <div className="text-xs text-gray-400">of {cards.length}</div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={goToPrevious}
                  size="sm"
                  className="w-full"
                >
                  ← Previous
                </Button>
                <Button
                  onClick={goToNext}
                  size="sm"
                  className="w-full"
                >
                  Next →
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setIsListModalOpen(true)}
                  variant="secondary"
                  size="sm"
                  className="w-full text-xs"
                >
                  📋 All Cards
                </Button>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  variant="success"
                  size="sm"
                  className="w-full text-xs"
                >
                  + Add Card
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Progress & Mobile Actions */}
        <div className="flex flex-col gap-2">
          {/* Progress Bar */}
          <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden border border-gray-700/50">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>

          {/* Compact Hints & Mobile Actions */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 whitespace-nowrap">
                💡 Click to flip
              </span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 whitespace-nowrap">
                🖱️ Drag to rotate
              </span>
              <span className="hidden sm:inline px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full border border-green-500/30 whitespace-nowrap">
                🔍 Scroll to zoom
              </span>
              <span className="hidden md:inline px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30 whitespace-nowrap">
                ⌨️ Arrow keys
              </span>
              {settings.rightClickEditEnabled && (
                <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/30 whitespace-nowrap" title="Right-click a card to edit it">
                  🖱️ Right-click to edit
                </span>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex lg:hidden gap-1.5 shrink-0">
              <Button
                onClick={() => setIsListModalOpen(true)}
                variant="secondary"
                size="sm"
                className="px-2 py-1 text-xs whitespace-nowrap"
              >
                📋 All
              </Button>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="success"
                size="sm"
                className="px-2 py-1 text-xs whitespace-nowrap"
              >
                + Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}