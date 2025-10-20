export const APP_CONFIG = {
  name: '3D Flashcards',
  version: '1.0.0',
  storageKeys: {
    cards: 'flashcards',
    settings: 'flashcardSettings',
  },
  defaults: {
    cardSide: 'front' as const,
    rightClickEdit: true,
    theme: 'dark' as const,
  },
};

export const ANIMATION_CONFIG = {
  cardFlip: {
    duration: 300,
    easing: 'ease-out',
  },
  modalTransition: {
    duration: 200,
    easing: 'ease-in',
  },
};

export const LAYOUT_CONFIG = {
  maxWidth: {
    modal: 'max-w-md',
    card: 'max-w-2xl',
  },
  spacing: {
    modal: 'p-6',
    page: 'p-3 md:p-4 lg:p-6',
  },
};

export const THEME = {
  colors: {
    primary: {
      light: '#3b82f6', // blue-500
      hover: '#2563eb', // blue-600
    },
    secondary: {
      light: '#4b5563', // gray-600
      hover: '#374151', // gray-700
    },
    success: {
      light: '#22c55e', // green-500
      hover: '#16a34a', // green-600
    },
    danger: {
      light: '#ef4444', // red-500
      hover: '#dc2626', // red-600
    },
    background: {
      primary: '#111827', // gray-900
      secondary: '#1f2937', // gray-800
    },
    text: {
      primary: '#ffffff', // white
      secondary: '#9ca3af', // gray-400
      accent: '#60a5fa', // blue-400
    },
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
};