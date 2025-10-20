export const VALIDATION_CONFIG = {
  card: {
    front: {
      minLength: 1,
      maxLength: 500,
      errorMessages: {
        required: 'Front text is required',
        tooLong: 'Front text must be less than 500 characters',
      },
    },
    back: {
      minLength: 1,
      maxLength: 500,
      errorMessages: {
        required: 'Back text is required',
        tooLong: 'Back text must be less than 500 characters',
      },
    },
    category: {
      maxLength: 50,
      errorMessages: {
        tooLong: 'Category must be less than 50 characters',
      },
    },
  },
  export: {
    minLanguages: 1,
    errorMessages: {
      noLanguages: 'Please select at least one language',
      noCards: 'No cards to export for the selected criteria',
    },
  },
  import: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/json'],
    errorMessages: {
      invalidType: 'Only JSON files are supported',
      tooLarge: 'File size must be less than 5MB',
      invalidFormat: 'Invalid file format',
    },
  },
};