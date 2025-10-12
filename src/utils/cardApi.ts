import { FlashCard } from '@/data/cards';

export interface CardApiResponse {
  success: boolean;
  data?: FlashCard;
  error?: string;
}

export async function createCard(cardData: Omit<FlashCard, 'id'>): Promise<FlashCard> {
  const response = await fetch('/api/cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      front: cardData.front.trim(),
      back: cardData.back.trim(),
      frontLang: cardData.frontLang,
      backLang: cardData.backLang,
      category: cardData.category?.trim() || null
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create card');
  }

  return response.json();
}

export async function updateCard(id: number, cardData: Omit<FlashCard, 'id'>): Promise<FlashCard> {
  const response = await fetch(`/api/cards/${id}`, {
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

  if (!response.ok) {
    throw new Error('Failed to update card');
  }

  return response.json();
}

export async function deleteCard(id: number): Promise<void> {
  const response = await fetch(`/api/cards/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete card');
  }
}
