import { GPIConfigResponse } from '../types/gpi-config';

/**
 * Utility functions for working with GPI configuration data
 */

/**
 * Replace placeholders in URL templates with actual values
 * @param template - URL template with placeholders like {id}, {tag}, etc.
 * @param params - Object containing values to replace placeholders
 * @returns Resolved URL string
 */
export const resolveUrlTemplate = (template: string, params: Record<string, string | number>): string => {
  let resolvedUrl = template;
  
  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    resolvedUrl = resolvedUrl.replace(new RegExp(placeholder, 'g'), String(value));
  });
  
  return resolvedUrl;
};

/**
 * Get a specific URL from the application configuration
 * @param config - GPI configuration object
 * @param urlKey - Key of the URL in application object
 * @param params - Parameters to replace in the URL template
 * @returns Resolved URL or null if not found
 */
export const getApplicationUrl = (
  config: GPIConfigResponse | null,
  urlKey: keyof GPIConfigResponse['application'],
  params: Record<string, string | number> = {}
): string | null => {
  if (!config?.application?.[urlKey]) {
    return null;
  }
  
  const template = config.application[urlKey];
  return resolveUrlTemplate(template, params);
};

/**
 * Get article URL for a specific article ID
 * @param config - GPI configuration object
 * @param articleId - Article ID
 * @returns Article URL or null if not found
 */
export const getArticleUrl = (config: GPIConfigResponse | null, articleId: string | number): string | null => {
  return getApplicationUrl(config, 'UrlTemplateElement', { id: articleId });
};

/**
 * Get rubric URL for a specific tag
 * @param config - GPI configuration object
 * @param tag - Tag name
 * @returns Rubric URL or null if not found
 */
export const getRubricUrl = (config: GPIConfigResponse | null, tag: string): string | null => {
  return getApplicationUrl(config, 'UrlTemplateRubric', { tag });
};

/**
 * Get search URL for specific keywords
 * @param config - GPI configuration object
 * @param keywords - Search keywords
 * @returns Search URL or null if not found
 */
export const getSearchUrl = (config: GPIConfigResponse | null, keywords: string): string | null => {
  return getApplicationUrl(config, 'UrlTemplateSearch', { keywords });
};

/**
 * Get media URL for a specific video ID
 * @param config - GPI configuration object
 * @param videoId - Video ID
 * @returns Media URL or null if not found
 */
export const getMediaUrl = (config: GPIConfigResponse | null, videoId: string | number): string | null => {
  return getApplicationUrl(config, 'UrlGetMediasVideo', { VideoId: videoId });
};

/**
 * Get emissions URL with pagination
 * @param config - GPI configuration object
 * @param count - Number of items to fetch
 * @param skip - Number of items to skip
 * @returns Emissions URL or null if not found
 */
export const getEmissionsUrl = (
  config: GPIConfigResponse | null,
  count: number = 20,
  skip: number = 0
): string | null => {
  return getApplicationUrl(config, 'UrlGetEmissions', { count, skip });
};

/**
 * Get medias URL with pagination
 * @param config - GPI configuration object
 * @param count - Number of items to fetch
 * @param skip - Number of items to skip
 * @returns Medias URL or null if not found
 */
export const getMediasUrl = (
  config: GPIConfigResponse | null,
  count: number = 20,
  skip: number = 0
): string | null => {
  return getApplicationUrl(config, 'UrlGetMedias', { count, skip });
};

/**
 * Get medias by category URL
 * @param config - GPI configuration object
 * @param categoryId - Category ID
 * @param count - Number of items to fetch
 * @param skip - Number of items to skip
 * @returns Category medias URL or null if not found
 */
export const getMediasByCategoryUrl = (
  config: GPIConfigResponse | null,
  categoryId: string | number,
  count: number = 20,
  skip: number = 0
): string | null => {
  return getApplicationUrl(config, 'UrlGetMediasCategory', { categoryid: categoryId, count, skip });
};

/**
 * Get authentication URLs
 */
export const getAuthUrls = (config: GPIConfigResponse | null) => {
  if (!config?.application) return null;
  
  return {
    sendMagicLink: (email: string, deviceType: string) => 
      getApplicationUrl(config, 'UrlSendMAgicLink', { email, DeviceType: deviceType }),
    authByMagicLink: (token: string, deviceType: string, deviceId: string) =>
      getApplicationUrl(config, 'UrlAuthByMagicLink', { token, DeviceType: deviceType, DeviceId: deviceId }),
    logout: (token: string) =>
      getApplicationUrl(config, 'UrlLogOut', { token }),
    deleteAccount: (token: string) =>
      getApplicationUrl(config, 'UrlDeleteAccount', { token }),
    lostPassword: (email: string) =>
      getApplicationUrl(config, 'UrlLostPassword', { email }),
    getProfile: (token: string) =>
      getApplicationUrl(config, 'UrlGetProfile', { token }),
    updateProfile: (token: string) =>
      getApplicationUrl(config, 'UrlUpdateProfile', { token }),
  };
};

/**
 * Get favorite URLs
 */
export const getFavoriteUrls = (config: GPIConfigResponse | null) => {
  if (!config?.application) return null;
  
  return {
    addFavorite: (elementId: string | number) =>
      getApplicationUrl(config, 'UrlAddArticleAsFavorite', { ElementId: elementId }),
    removeFavorite: (elementId: string | number) =>
      getApplicationUrl(config, 'UrlRemoveArticleAsFavorite', { ElementId: elementId }),
  };
};

/**
 * Get subscription URLs
 */
export const getSubscriptionUrls = (config: GPIConfigResponse | null) => {
  if (!config?.application) return null;
  
  return {
    subscribe: config.application.UrlSubscribe,
    restore: config.application.UrlSubscriptionRestore,
  };
};

/**
 * Check if the app version meets the minimum requirements
 * @param config - GPI configuration object
 * @param currentVersion - Current app version
 * @returns Object with version check results
 */
export const checkVersionCompatibility = (
  config: GPIConfigResponse | null,
  currentVersion: string
): { isCompatible: boolean; needsUpdate: boolean; targetVersion: string; minimumVersion: string } => {
  if (!config?.application) {
    return {
      isCompatible: false,
      needsUpdate: false,
      targetVersion: '',
      minimumVersion: '',
    };
  }
  
  const { TargetVersion, MinumumVersion } = config.application;
  
  // Simple version comparison (you might want to use a more sophisticated version comparison library)
  const compareVersions = (version1: string, version2: string): number => {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;
      
      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }
    
    return 0;
  };
  
  const isCompatible = compareVersions(currentVersion, MinumumVersion) >= 0;
  const needsUpdate = compareVersions(currentVersion, TargetVersion) < 0;
  
  return {
    isCompatible,
    needsUpdate,
    targetVersion: TargetVersion,
    minimumVersion: MinumumVersion,
  };
};
