import en from '@/i18n/en.json'
import ko from '@/i18n/ko.json'

export type Locale = 'en' | 'ko'

const translations = {
  en,
  ko,
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}

export function getSupportedLocales(): Locale[] {
  return ['en', 'ko']
}

