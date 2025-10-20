// Types for application settings
export interface Settings {
  defaultCardSide: 'front' | 'back';
  rightClickEditEnabled: boolean;
  theme?: 'light' | 'dark';
}

export interface UseSettingsReturn {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}