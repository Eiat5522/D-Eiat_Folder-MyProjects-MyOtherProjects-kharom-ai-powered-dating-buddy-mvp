import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// To conform to the plan, we'll import from the actual paths once the files are created.
// For now, assuming they will be at '../locales/en.json' and '../locales/th.json'
// If these paths are incorrect, they will need to be adjusted.
import en from '../locales/en.json';
import th from '../locales/th.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3', // For Expo compatibility / new i18next versions
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // Add debug flag for development to see logs
    debug: __DEV__,
  });

export default i18n;
