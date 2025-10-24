import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      const locales = getLocales();
      const deviceLanguage = locales[0]?.languageCode || 'en';

      const supportedLanguages = ['en', 'fr', 'es'];
      const language = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

      callback(language);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => { },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    debug: __DEV__,

    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
