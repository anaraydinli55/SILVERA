import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  // load translations using http (default public/locales/{{lng}}/{{ns}}.json)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languagedetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'az', // Default language
    debug: import.meta.env.NODE_ENV === 'development', // Enable debug in dev mode
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'], // Prioritize localStorage for language persistence
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/loc/{{lng}}/{{ns}}.json', // Path to your translation files
    },
    ns: ['translation'], // Specify your namespaces if you have multiple
    defaultNS: 'translation',
  });

export default i18n;
