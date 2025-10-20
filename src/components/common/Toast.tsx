import { Toaster, toast } from 'react-hot-toast';
import { ERROR_MESSAGES } from '@/config';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f2937', // gray-800
          color: '#fff',
          borderRadius: '0.5rem',
          border: '1px solid rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        },
        success: {
          iconTheme: {
            primary: '#22c55e', // green-500
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444', // red-500
            secondary: '#fff',
          },
          duration: 5000,
        },
      }}
    />
  );
};

type ErrorType = 'network' | 'api';

export const showError = (error: Error, type: ErrorType = 'api') => {
  const message = 
    error.message || 
    (type === 'network' ? ERROR_MESSAGES.network.default : ERROR_MESSAGES.api.default);
    
  toast.error(message);
};

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showInfo = (message: string) => {
  toast(message);
};