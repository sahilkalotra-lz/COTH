import i18n from 'i18next';

export interface LanguageConfig {
  LangCode: string;
  TranslationFile: string;
  LangName: string;
  LangDefault: boolean;
  IconUrl: string;
}

class LocalizationService {
  private static instance: LocalizationService;
  private currentLanguage: string = 'en';

  private constructor() {}

  static getInstance(): LocalizationService {
    if (!LocalizationService.instance) {
      LocalizationService.instance = new LocalizationService();
    }
    return LocalizationService.instance;
  }

  async loadFromRemote(translationUrl: string): Promise<any> {
    try {
      const response = await fetch(translationUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to load remote translations:', error);
      return null;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setCurrentLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
  }
}

export default LocalizationService;
