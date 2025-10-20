// Types for flashcards
export interface FlashCard {
  id: number;
  front: string;
  back: string;
  frontLang: string;
  backLang: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewFlashCard = Omit<FlashCard, 'id'>;

// Types for card operations
export interface CardOperations {
  addCard: (card: NewFlashCard) => Promise<FlashCard>;
  updateCard: (card: FlashCard) => Promise<FlashCard>;
  deleteCard: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
}

// Hook return types
export interface UseCardsReturn extends CardOperations {
  cards: FlashCard[];
  loading: boolean;
  error: string | null;
}

export interface UseCardNavigationReturn {
  currentIndex: number;
  cardVersion: number;
  goToPrevious: () => void;
  goToNext: () => void;
  goToCard: (index: number) => void;
  incrementVersion: () => void;
}