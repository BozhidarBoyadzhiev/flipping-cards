import { useState } from 'react';
import { FlashCard } from '@/data/cards';
import ModalWrapper from './ModalWrapper';
import CardForm from './CardForm';

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
      const response = await fetch(`/api/cards/${card.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          front: cardData.front.trim(),
          back: cardData.back.trim(),
          frontLang: cardData.frontLang,
          backLang: cardData.backLang,
          category: cardData.category?.trim() || null
        })
      });

      if (!response.ok) throw new Error('Failed to update card');

      const updatedCard = await response.json();
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
      />
    </ModalWrapper>
  );
}