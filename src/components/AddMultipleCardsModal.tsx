import { ModalWrapper, LoadingSpinner } from './';

interface AddMultipleCardsModal {
  isOpen: boolean;
  onClose: () => void;
  //onCardsAdded: (card: FlashCard) => void;
}

export default function AddMultipleCardsModal({ isOpen, onClose, /*onCardsAdded*/ }: AddMultipleCardsModal) {
  return (
      <ModalWrapper isOpen={isOpen} onClose={onClose} title="Add multiple cards">
        <div suppressHydrationWarning className="flex flex-col items-center justify-center">
            <LoadingSpinner message="Feature coming soon!" />
        </div>
      </ModalWrapper>
  );
}