'use client'

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'
import { Locale, getTranslations } from '@/lib/i18n'
import { trackEvent } from '@/lib/analytics'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => any
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  
  // Memoize the translation function so it only updates when locale changes
  const t = useMemo(() => getTranslations(locale), [locale])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    trackEvent('language_toggle', { locale: newLocale })
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}

