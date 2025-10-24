import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LocalizationService from '../services/localization/localization-service';
import { useAppConfig } from './useAppConfig';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  const { getAvailableLanguages, config } = useAppConfig();
  const [isLoading, setIsLoading] = useState(false);

  const localizationService = LocalizationService.getInstance();

  useEffect(() => {
    if (config && !isLoading) {
      initializeDefaultLanguage();
    }
  }, [config]);

  const initializeDefaultLanguage = useCallback(async () => {
    try {
      const availableLanguages = getAvailableLanguages();
      const defaultLanguage = availableLanguages.find(lang => lang.LangDefault) || availableLanguages[0];
      
      if (defaultLanguage && defaultLanguage.TranslationFile) {
        await switchLanguage(defaultLanguage.LangCode);
      }
    } catch (error) {
      console.error('Failed to initialize default language:', error);
    }
  }, [getAvailableLanguages]);

  const switchLanguage = useCallback(async (languageCode: string) => {
    try {
      setIsLoading(true);

      // Get language config from backend
      const availableLanguages = getAvailableLanguages();
      const languageConfig = availableLanguages.find(lang => lang.LangCode === languageCode);

      if (languageConfig && languageConfig.TranslationFile) {
        // Load from remote URL
        const remoteTranslations = await localizationService.loadFromRemote(languageConfig.TranslationFile);
        if (remoteTranslations) {
          // Add translations to i18n and switch language
          i18n.addResourceBundle(languageCode, 'translation', remoteTranslations, true, true);
          i18n.changeLanguage(languageCode);
          localizationService.setCurrentLanguage(languageCode);
          return;
        }
      }

      console.warn(`No translations available for ${languageCode}`);
    } catch (error) {
      console.error(`Failed to switch to language ${languageCode}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [getAvailableLanguages]);

  return {
    isLoading,
    currentLanguage: localizationService.getCurrentLanguage(),
    t,
    switchLanguage,
    getAvailableLanguages,
    initializeDefaultLanguage,
  };
};

export default useLocalization;
