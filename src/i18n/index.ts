import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  'pt-BR': { translation: ptBR },
  'en': { translation: en },
  'es': { translation: es },
};

// Check localStorage or browser language
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('atendai_lang');
    if (saved && (saved === 'pt-BR' || saved === 'en' || saved === 'es')) {
      return saved;
    }
    const navLang = navigator.language;
    if (navLang.startsWith('es')) return 'es';
    if (navLang.startsWith('en')) return 'en';
  }
  return 'pt-BR';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
  });

export default i18n;
