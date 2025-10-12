import { useState } from 'react';
import { FlashCard } from '@/data/cards';
import { ModalWrapper, CardForm } from './';
import { createCard } from '@/utils';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardAdded: (card: FlashCard) => void;
}

export default function AddCardModal({ isOpen, onClose, onCardAdded }: AddCardModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (cardData: Omit<FlashCard, 'id'>) => {
    if (!cardData.front.trim() || !cardData.back.trim()) {
      setError('Please fill in both front and back text');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newCard = await createCard(cardData);
      onCardAdded(newCard);
      onClose();
    } catch (err) {
      console.error('Error creating card:', err);
      setError('Failed to create card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Add New Card">
      <CardForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
        error={error}
        submitButtonText={loading ? 'Creating...' : 'Create Card'}
        submitButtonColor="blue"
      />
    </ModalWrapper>
  );
}