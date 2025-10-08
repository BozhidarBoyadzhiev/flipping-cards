export interface LanguageOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const languageOptions: readonly LanguageOption[] = [
  { value: 'english', label: 'English'},
  { value: 'bulgarian', label: 'Bulgarian'},
  { value: 'german', label: 'German'},
  { value: 'vietnamese', label: 'Vietnamese'},
  { value: 'french', label: 'French'},
];