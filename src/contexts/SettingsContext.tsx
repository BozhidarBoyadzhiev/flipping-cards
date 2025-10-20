import { createContext, useContext, useState, useEffect } from 'react';
import { Settings, UseSettingsReturn } from '@/types';

const defaultSettings: Settings = {
  defaultCardSide: 'front',
  rightClickEditEnabled: true,
  theme: 'dark',
};

const SettingsContext = createContext<UseSettingsReturn | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('flashcardSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (err) {
        console.error('Failed to parse saved settings:', err);
      }
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcardSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): UseSettingsReturn {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}