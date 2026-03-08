import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enLanding from '../../../../locales/en/landing.json';
import esLanding from '../../../../locales/es/landing.json';
import enAuth from '../../../../locales/en/auth.json';
import esAuth from '../../../../locales/es/auth.json';
import enHealth from '../../../../locales/en/health.json';
import esHealth from '../../../../locales/es/health.json';
import enDashboard from '../../../../locales/en/dashboard.json';
import esDashboard from '../../../../locales/es/dashboard.json';
import enSmartHook from '../../../../locales/en/smart_hook.json';
import esSmartHook from '../../../../locales/es/smart_hook.json';

const detectedLanguage = typeof navigator !== 'undefined' && navigator.language.startsWith('es') ? 'es' : 'en';

i18n.use(initReactI18next).init({
  lng: detectedLanguage,
  fallbackLng: 'en',
  resources: {
    en: {
      landing: enLanding,
      auth: enAuth,
      health: enHealth,
      dashboard: enDashboard,
      smart_hook: enSmartHook,
    },
    es: {
      landing: esLanding,
      auth: esAuth,
      health: esHealth,
      dashboard: esDashboard,
      smart_hook: esSmartHook,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
