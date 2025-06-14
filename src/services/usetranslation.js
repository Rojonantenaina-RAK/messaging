import translations from './translation.json';

export const useTranslation = (currentLanguage = 'fr') => {
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations['fr'][key] || key;
  };

  return { t };
};