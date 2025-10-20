import { ERROR_MESSAGES } from '@/config';

export class AppError extends Error {
  public code?: string;
  public type: 'network' | 'api' | 'validation';

  constructor(
    message: string,
    type: 'network' | 'api' | 'validation' = 'api',
    code?: string
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
  }
}

export function handleApiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // Network errors
    if ('cause' in error && error.cause === 'network') {
      return new AppError(
        error.message || ERROR_MESSAGES.network.default,
        'network'
      );
    }

    // Timeout errors
    if (error.name === 'TimeoutError') {
      return new AppError(ERROR_MESSAGES.network.timeout, 'network');
    }

    // Generic error with message
    return new AppError(error.message);
  }

  // Unknown errors
  return new AppError(ERROR_MESSAGES.api.default);
}

export function isOffline(): boolean {
  return typeof window !== 'undefined' && !window.navigator.onLine;
}

export function handleValidationError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  let message = 'Validation failed';
  if (error instanceof Error) {
    message = error.message;
  }

  return new AppError(message, 'validation');
}

// Helper to safely parse JSON with error handling
export function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    console.error('Failed to parse JSON:', err);
    return null;
  }
}