const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  endpoints: {
    cards: {
      base: '/cards',
      byId: (id: number) => `/cards/${id}`,
    },
  },
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
  retries: 3,
};

export const ERROR_MESSAGES = {
  network: {
    offline: 'You are offline. Please check your internet connection.',
    timeout: 'Request timed out. Please try again.',
    default: 'Network error occurred. Please try again.',
  },
  api: {
    notFound: 'Resource not found.',
    serverError: 'Server error occurred. Please try again later.',
    default: 'An unexpected error occurred.',
  },
};

export default API_CONFIG;