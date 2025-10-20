import { InputHTMLAttributes } from 'react';
import PropTypes from 'prop-types';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** The label text for the input */
  label: string;
  /** Whether the field is optional */
  optional?: boolean;
}

/**
 * A form input component with a label and consistent styling
 */
export function FormInput({ label, optional, disabled, ...props }: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        {label} {optional && <span className="text-gray-500">(optional)</span>}
      </label>
      <input
        {...props}
        disabled={disabled}
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}