"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface Settings {
  defaultCardSide: 'front' | 'back'
  rightClickEditEnabled: boolean
}

const defaultSettings: Settings = {
  defaultCardSide: 'front',
  rightClickEditEnabled: true
}

interface SettingsContextValue {
  settings: Settings
  updateSettings: (newSettings: Settings) => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('app.settings') : null
      if (raw) {
        const parsed = JSON.parse(raw) as Settings
        setSettings({ ...defaultSettings, ...parsed })
      }
    } catch (_) {
      // ignore corrupted storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist to localStorage whenever settings change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('app.settings', JSON.stringify(settings))
      }
    } catch (_) {
      // ignore storage failures
    }
  }, [settings])

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings)
  }, [])

  const value = useMemo<SettingsContextValue>(() => ({ settings, updateSettings }), [settings, updateSettings])

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return ctx
}