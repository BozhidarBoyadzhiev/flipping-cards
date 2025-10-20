import { LoadingSpinnerProps } from '@/types';

export default function LoadingSpinner({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-blue-200 animate-spin rounded-full`} />
      <p className="text-gray-400 animate-pulse">{message}</p>
    </div>
  );
}