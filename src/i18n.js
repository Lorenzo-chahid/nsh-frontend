import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';
import nl from './locales/nl.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  nl: { translation: nl },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Langue par défaut
  fallbackLng: 'en', // Langue de secours si une traduction est manquante
  interpolation: {
    escapeValue: false, // React gère automatiquement l'échappement pour éviter les failles XSS
  },
});

export default i18n;
