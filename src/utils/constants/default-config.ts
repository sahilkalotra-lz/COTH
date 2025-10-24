import { GPIConfigResponse } from '../../types/gpi-config';

/**
 * Default GPI configuration for fallback scenarios
 * This is the single source of truth for default configuration
 */
export const DEFAULT_GPICONFIG: GPIConfigResponse = {
  apiDebug: null,
  application: {
    baseUrl: 'https://api.example.com',
    refreshDataTimeInterval: 300, // 5 minutes
    rebootTimeInterval: 3600,
    backGroundFetchTimeInterval: 1800,
    UrlPrefetch: '',
    UrlTemplateElement: '',
    UrlTemplateRubric: '',
    UrlTemplateSearch: '',
    UrlEmailVerif: '',
    UrlUpdateDevice: '',
    UrlSendMAgicLink: '',
    UrlAuthByMagicLink: '',
    UrlLogOut: '',
    UrlDeleteAccount: '',
    UrlLostPassword: '',
    UrlGetProfile: '',
    UrlUpdateProfile: '',
    UrlRegisterStep1: '',
    UrlRegisterStep2: '',
    UrlGetEmissions: '',
    UrlGetMedias: '',
    UrlGetMediasCategory: '',
    UrlGetMediasVideo: '',
    UrlAddArticleAsFavorite: '',
    UrlRemoveArticleAsFavorite: '',
    UrlSubscribe: '',
    UrlSubscriptionRestore: '',
    TargetVersion: '1.0.0',
    MinumumVersion: '1.0.0',
    MainTopLogo: '',
    CacheDate: new Date().toISOString(),
  },
  Tabs: [
    {
      id: 'tab_home',
      tabTitle: 'À la Une',
      icon: 'icon_home_tab',
      type: 'pager',
      rubric_id: null,
      pages: [
        {
          id: 'rubric-home',
          title: 'À LA UNE',
          type: 'rubric',
          rubric_id: 'home',
          customizable: false,
          selected: true,
          url: null,
        },
        {
          id: 'rubric-latest-news',
          title: 'EN CONTINU',
          type: 'rubric',
          rubric_id: 'latest-news',
          customizable: false,
          selected: true,
          url: null,
        },
      ],
    },
    {
      id: 'tab_favorite',
      tabTitle: 'Vos selections',
      icon: 'icon_favorites_tab',
      type: 'rubric',
      rubric_id: 'rubric-favorites',
      pages: null,
    },
    {
      id: 'tab_videos',
      tabTitle: 'Videos',
      icon: 'icon_videos_tab',
      type: 'video_section',
      rubric_id: null,
      pages: null,
    },
  ],
  Languages: [
    {
      LangCode: 'en',
      TranslationFile: 'en.json',
      LangName: 'English',
      LangDefault: true,
      IconUrl: '',
    },
  ],
  subscription: {
    isSubscriptionEnabled: false,
  },
  Ads: {
    isSplashEnabled: false,
    SplashId: 0,
    SplashTimer: 0,
    ReviveId: '',
  },
  templates: {
    article_v2: '',
    news_v2: '',
    gdpr: '',
  },
  about: {
    hash: 'default',
    LastUpdate: new Date().toISOString(),
  },
};
