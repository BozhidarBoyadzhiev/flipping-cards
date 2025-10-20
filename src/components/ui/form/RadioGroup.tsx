import { InputHTMLAttributes } from 'react';

interface RadioGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({ label, children, className = '' }: RadioGroupProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        {label}
      </label>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

interface RadioOptionProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function RadioOption({ label, ...props }: RadioOptionProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <input
        type="radio"
        {...props}
        className="w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2"
      />
      <span className="text-gray-200 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}