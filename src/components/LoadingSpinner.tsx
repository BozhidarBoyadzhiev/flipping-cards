import { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = memo(function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="text-center">
      <div className={`animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4 ${sizeClasses[size]}`}></div>
      <p className={`text-white ${textSizes[size]}`}>{message}</p>
    </div>
  );
});

export default LoadingSpinner;
