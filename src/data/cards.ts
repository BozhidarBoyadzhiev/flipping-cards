export interface FlashCard {
  id: number;
  front: string;
  back: string;
  frontLang: string;
  backLang: string;
  category?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}