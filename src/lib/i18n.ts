import en from '@/i18n/en.json'
import ko from '@/i18n/ko.json'

export type Locale = 'en' | 'ko'

const translations = {
  en,
  ko,
}

// Helper function to get nested property from object using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

export function getTranslations(locale: Locale) {
  const messages = translations[locale]
  
  return function t(key: string): any {
    const value = getNestedValue(messages, key)
    
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    
    return value
  }
}

export function getSupportedLocales(): Locale[] {
  return ['en', 'ko']
}

