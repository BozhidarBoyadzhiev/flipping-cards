import { ButtonProps } from '@/types';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  secondary: 'bg-gray-700 hover:bg-gray-600',
  success: 'bg-green-500 hover:bg-green-600',
  danger: 'bg-red-500 hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({ 
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        'text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}