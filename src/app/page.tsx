'use client'

import { useState, useEffect } from 'react'
import FlipCard3D from '@/components/FlipCard3D'
import AddCardModal from '@/components/AddCardModal'
import CardListModal from '@/components/CardListModal'
import { FlashCard } from '@/data/cards'

export default function Home() {
  const [cards, setCards] = useState<FlashCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isListModalOpen, setIsListModalOpen] = useState(false)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cards')
      
      if (!response.ok) {
        throw new Error('Failed to fetch cards')
      }
      
      const data = await response.json()
      setCards(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching cards:', err)
      setError('Failed to load flashcards. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, cards.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? cards.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === cards.length - 1 ? 0 : prev + 1
    )
  }

  const handleCardAdded = (newCard: FlashCard) => {
    setCards([...cards, newCard])
    setCurrentIndex(cards.length) // Go to the new card
  }

  const handleCardDeleted = (deletedId: number) => {
    const newCards = cards.filter(card => card.id !== deletedId)
    setCards(newCards)
    
    // Adjust current index if needed
    if (currentIndex >= newCards.length && newCards.length > 0) {
      setCurrentIndex(newCards.length - 1)
    } else if (newCards.length === 0) {
      setCurrentIndex(0)
    }
  }

  const handleCardSelected = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading flashcards...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">❌ {error}</p>
          <button
            onClick={fetchCards}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
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
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            + Create First Card
          </button>
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
        <FlipCard3D key={currentCard.id} card={currentCard} />
      </div>

      {/* Navigation Controls */}
      <div className="mt-4 flex items-center gap-6">
        <button
          onClick={goToPrevious}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          ← Previous
        </button>

        <div className="text-white font-semibold text-center">
          <div className="text-3xl text-blue-400">{currentIndex + 1}</div>
          <div className="text-sm text-gray-500">of {cards.length}</div>
        </div>

        <button
          onClick={goToNext}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          Next →
        </button>
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
        <button
          onClick={() => setIsListModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          View All ({cards.length})
        </button>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Card
        </button>
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
      />
    </main>
  )
}