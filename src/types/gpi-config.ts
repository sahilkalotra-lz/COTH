/**
 * Types for GrandPrix Info (GPI) Configuration API
 * Based on the API response from https://apiv2.grandprixgroup.com/api/MobileControllerGPIRN/v1/iphone/GPIConfig
 */

export interface GPIAbout {
  hash: string;
  LastUpdate: string;
}

export interface GPIApplication {
  baseUrl: string;
  refreshDataTimeInterval: number;
  rebootTimeInterval: number;
  backGroundFetchTimeInterval: number;
  UrlPrefetch: string;
  UrlTemplateElement: string;
  UrlTemplateRubric: string;
  UrlTemplateSearch: string;
  UrlEmailVerif: string;
  UrlUpdateDevice: string;
  UrlSendMAgicLink: string;
  UrlAuthByMagicLink: string;
  UrlLogOut: string;
  UrlDeleteAccount: string;
  UrlLostPassword: string;
  UrlGetProfile: string;
  UrlUpdateProfile: string;
  UrlRegisterStep1: string;
  UrlRegisterStep2: string;
  UrlGetEmissions: string;
  UrlGetMedias: string;
  UrlGetMediasCategory: string;
  UrlGetMediasVideo: string;
  UrlAddArticleAsFavorite: string;
  UrlRemoveArticleAsFavorite: string;
  UrlSubscribe: string;
  UrlSubscriptionRestore: string;
  TargetVersion: string;
  MinumumVersion: string;
  MainTopLogo: string;
  CacheDate: string;
}

export interface GPISubscription {
  isSubscriptionEnabled: boolean;
}

export interface GPIAds {
  isSplashEnabled: boolean;
  SplashId: number;
  SplashTimer: number;
  ReviveId: string;
}

export interface GPITabPage {
  id: string;
  title: string;
  type: 'rubric' | 'rubric-web';
  rubric_id: string | null;
  customizable: boolean;
  selected: boolean;
  url: string | null;
}

export interface GPITab {
  id: string;
  tabTitle: string;
  icon: string;
  type: 'pager' | 'rubric' | 'video_section';
  rubric_id: string | null;
  pages: GPITabPage[] | null;
}

export interface GPITemplates {
  article_v2: string;
  news_v2: string;
  gdpr: string;
}

export interface GPILanguage {
  LangCode: string;
  TranslationFile: string;
  LangName: string;
  LangDefault: boolean;
  IconUrl: string;
}

export interface GPIConfigResponse {
  apiDebug: any;
  about: GPIAbout;
  application: GPIApplication;
  subscription: GPISubscription;
  Ads: GPIAds;
  Tabs: GPITab[];
  templates: GPITemplates;
  Languages: GPILanguage[];
}

export interface AppConfigState {
  config: GPIConfigResponse | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isInitialized: boolean;
  isOnboardingCompleted: boolean;
}

export interface AppConfigActions {
  setConfig: (config: GPIConfigResponse) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdated: (timestamp: string) => void;
  setInitialized: (initialized: boolean) => void;
  clearConfig: () => void;
}
