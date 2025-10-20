import { StylesConfig, GroupBase } from 'react-select';

// Helper function to create base styles for both single and multi-select
function createBaseStyles<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): Partial<StylesConfig<Option, IsMulti, Group>> {
  return {
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
}

// Create single select styles
export function createDropdownStyle<
  Option,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): StylesConfig<Option, false, Group> {
  return {
    ...createBaseStyles<Option, false, Group>(),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  };
}

// Create multi-select styles
export function createMultiDropdownStyle<
  Option,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): StylesConfig<Option, true, Group> {
  return {
    ...createBaseStyles<Option, true, Group>(),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#374151',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
      padding: '4px 6px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#9ca3af',
      ':hover': {
        backgroundColor: '#ef4444',
        color: '#fff',
      },
    }),
  };
}

import { LanguageOption } from '@/data/languages';

// Export default instances for common use
export const dropdownStyle = createDropdownStyle<LanguageOption>();
export const multiDropdownStyle = createMultiDropdownStyle<LanguageOption>();