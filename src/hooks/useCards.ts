import { useState, useEffect, useCallback } from 'react';
import { FlashCard } from '@/data/cards';

export function useCards() {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cards');
      
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      
      const data = await response.json();
      setCards(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Failed to load flashcards. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCard = useCallback((newCard: FlashCard) => {
    setCards(prev => [...prev, newCard]);
  }, []);

  const updateCard = useCallback((updatedCard: FlashCard) => {
    setCards(prev => prev.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    ));
  }, []);

  const deleteCard = useCallback((deletedId: number) => {
    setCards(prev => prev.filter(card => card.id !== deletedId));
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    addCard,
    updateCard,
    deleteCard,
    refetch: fetchCards
  };
}
