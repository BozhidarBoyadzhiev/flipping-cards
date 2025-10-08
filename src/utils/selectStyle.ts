import { StylesConfig } from 'react-select';
import { LanguageOption } from '@/data/languages';

export const dropdownStyle: StylesConfig<LanguageOption, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#1f2937',
    borderColor: state.isFocused ? '#3b82f6' : '#374151',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
    color: '#fff',
    padding: '2px',
    borderRadius: '0.5rem',
    minHeight: '44px',
    '&:hover': {
      borderColor: '#3b82f6',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#111827',
    borderRadius: '0.5rem',
    border: '1px solid #374151',
    overflow: 'hidden',
    zIndex: 50,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#2563eb'
      : state.isFocused
      ? '#1e3a8a'
      : '#111827',
    color: '#fff',
    cursor: 'pointer',
    padding: '10px 16px',
    '&:active': {
      backgroundColor: '#1d4ed8',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#3b82f6' : '#9ca3af',
    '&:hover': {
      color: '#3b82f6',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};