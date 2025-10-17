import { useState } from 'react';
import { FlashCard } from '@/data/cards';
import { ModalWrapper, CardForm } from './';
import { updateCard } from '@/utils';

interface UpdateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: FlashCard;
  onCardUpdated: (card: FlashCard) => void;
}

export default function UpdateCardModal({ isOpen, onClose, card, onCardUpdated }: UpdateCardModalProps) {
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
      const updatedCard = await updateCard(card.id, cardData);
      onCardUpdated(updatedCard);
      onClose();
    } catch (err) {
      console.error('Error updating card:', err);
      setError('Failed to update card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Update Card">
      <CardForm
        initialData={card}
        onSubmit={handleSubmit}
        onCancel={onClose}
        loading={loading}
        error={error}
        submitButtonText={loading ? 'Updating...' : 'Update Card'}
        submitButtonColor="purple"
        showAddMultiple={false}
      />
    </ModalWrapper>
  );
}