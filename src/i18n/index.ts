/* eslint-disable import/no-named-as-default-member */
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

import { enTranslation } from './en';
import { esTranslation } from './es';
import { ptTranslation } from './pt';

export const LANGUAGE_STORAGE_KEY = 'app_language';

export const resources = {
  en: { ...enTranslation },
  es: { ...esTranslation },
  pt: { ...ptTranslation }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    detection: {
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      order: ['localStorage', 'navigator']
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources
  });

export default i18n;
