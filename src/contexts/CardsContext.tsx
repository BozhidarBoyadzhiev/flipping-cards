import { createContext, useContext, useState, useCallback } from 'react';
import { UseCardsReturn, FlashCard, NewFlashCard } from '@/types';

const CardsContext = createContext<UseCardsReturn | undefined>(undefined);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Here we would typically fetch cards from an API
      // For now, we'll just simulate it with localStorage
      const savedCards = localStorage.getItem('flashcards');
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cards');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cards initially
  useState(() => {
    refetch();
  });

  const addCard = useCallback(async (newCard: NewFlashCard): Promise<FlashCard> => {
    try {
      const card: FlashCard = {
        ...newCard,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCards(prev => {
        const updated = [...prev, card];
        localStorage.setItem('flashcards', JSON.stringify(updated));
        return updated;
      });

      return card;
    } catch (err) {
      throw new Error('Failed to add card');
    }
  }, []);

  const updateCard = useCallback(async (updatedCard: FlashCard): Promise<FlashCard> => {
    try {
      setCards(prev => {
        const updated = prev.map(card => 
          card.id === updatedCard.id 
            ? { ...updatedCard, updatedAt: new Date() }
            : card
        );
        localStorage.setItem('flashcards', JSON.stringify(updated));
        return updated;
      });

      return updatedCard;
    } catch (err) {
      throw new Error('Failed to update card');
    }
  }, []);

  const deleteCard = useCallback(async (id: number): Promise<void> => {
    try {
      setCards(prev => {
        const updated = prev.filter(card => card.id !== id);
        localStorage.setItem('flashcards', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      throw new Error('Failed to delete card');
    }
  }, []);

  return (
    <CardsContext.Provider 
      value={{ 
        cards, 
        loading, 
        error, 
        addCard, 
        updateCard, 
        deleteCard, 
        refetch 
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export function useCards(): UseCardsReturn {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}