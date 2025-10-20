import { FlashCard } from './cards';
import { Settings } from './settings';

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardAdded: (card: FlashCard) => void;
}

export interface UpdateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: FlashCard;
  onCardUpdated: (card: FlashCard) => void;
}

export interface CardListModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: FlashCard[];
  onCardDeleted: (id: number) => void;
  onCardSelected: (index: number) => void;
  onCardUpdated: (card: FlashCard) => void;
}

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: FlashCard[];
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Partial<Settings>) => void;
}

// Component Props
export interface CardFormProps {
  initialData?: FlashCard;
  onSubmit: (card: Omit<FlashCard, 'id'>) => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
  submitButtonText: string;
  submitButtonColor: 'blue' | 'purple';
  showAddMultiple?: boolean;
}

export interface FlipCard3DProps {
  card: FlashCard;
  onCardUpdated?: (card: FlashCard) => void;
}

export interface Card3DProps {
  card: FlashCard;
  position: [number, number, number];
  onOpenModal: () => void;
}

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}