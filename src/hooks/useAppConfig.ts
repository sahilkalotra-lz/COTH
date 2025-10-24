import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { 
  setConfig, 
  setLoading, 
  setError, 
  clearConfig,
  setInitialized
} from '../store/slices/appConfigSlice';
import { fetchGPIConfig } from '../services/api/api';
import { OfflineDataService } from '../services/database/offline-service';
import { DEFAULT_GPICONFIG } from '../utils/constants/default-config';
import useNetworkStatus from './useNetworkStatus';

/**
 * Custom hook for managing GPI application configuration
 * Provides methods to fetch, validate, and manage app configuration state
 */
export const useAppConfig = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appConfig = useSelector((state: RootState) => state.appConfig);
  const { isOnline } = useNetworkStatus();

  const fetchConfig = useCallback(async (forceRefresh: boolean = false) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const config = await fetchGPIConfig();
      console.log('✅ Configuration fetched successfully',config);

      dispatch(setConfig(config));
      return config;
    } catch (error) {
      console.error('❌ Configuration fetch failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch configuration';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, appConfig.config, appConfig.lastUpdated]);

  /**
   * Initialize configuration on app start
   * Simple flow: try cached config first, then API, then default
   */
  const initializeConfig = useCallback(async () => {
    if (appConfig.isInitialized) {
      return appConfig.config;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // 1. Try to get cached config first (fast startup)
      const cachedConfig = await OfflineDataService.getAppConfig();
      if (cachedConfig && cachedConfig.about?.hash !== 'default') {
        console.log('📱 Using cached configuration');
        dispatch(setConfig(cachedConfig));
        dispatch(setInitialized(true));
        return cachedConfig;
      }

      // 2. If online, fetch fresh config from API
      if (isOnline) {
        console.log('🌐 Fetching fresh configuration from API...');
        const freshConfig = await fetchGPIConfig();
        
        // Save to cache for next time
        await OfflineDataService.saveAppConfig(freshConfig);
        
        dispatch(setConfig(freshConfig));
        dispatch(setInitialized(true));
        return freshConfig;
      }

      // 3. If offline and no cache, use default config
      console.log('📱 Offline with no cache, using default configuration');
      dispatch(setConfig(DEFAULT_GPICONFIG));
      dispatch(setInitialized(true));
      return DEFAULT_GPICONFIG;

    } catch (error) {
      console.error('❌ Configuration initialization failed:', error);
      
      // Try any cached config as fallback
      try {
        const fallbackConfig = await OfflineDataService.getAppConfig();
        if (fallbackConfig) {
          console.log('📱 Using fallback cached configuration');
          dispatch(setConfig(fallbackConfig));
          dispatch(setInitialized(true));
          return fallbackConfig;
        }
      } catch (fallbackError) {
        console.warn('⚠️ Fallback config also failed:', fallbackError);
      }

      // Last resort: use default config
      console.log('⚠️ Using default configuration');
      dispatch(setConfig(DEFAULT_GPICONFIG));
      dispatch(setInitialized(true));
      return DEFAULT_GPICONFIG;
    } finally {
      dispatch(setLoading(false));
    }
  }, [appConfig.isInitialized, appConfig.config, isOnline, dispatch]);

  /**
   * Refresh configuration manually
   */
  const refreshConfig = useCallback(async () => {
    try {
      return await fetchConfig(true);
    } catch (error) {
      throw error;
    }
  }, [fetchConfig]);



  /**
   * Force re-initialization (useful when backend changes)
   */
  const forceReinitialize = useCallback(async () => {
    console.log('🔄 Force re-initializing configuration...');
    dispatch(clearConfig());
    return await initializeConfig();
  }, [dispatch, initializeConfig]);

  /**
   * Get specific configuration values
   */
  const getConfigValue = useCallback((path: string) => {
    if (!appConfig.config) return null;
    
    const keys = path.split('.');
    let value: any = appConfig.config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return value;
  }, [appConfig.config]);

  /**
   * Get available languages
   */
  const getAvailableLanguages = useCallback(() => {
    return appConfig.config?.Languages || [];
  }, [appConfig.config]);

  /**
   * Get default language
   */
  const getDefaultLanguage = useCallback(() => {
    const languages = getAvailableLanguages();
    return languages.find(lang => lang.LangDefault) || languages[0] || null;
  }, [getAvailableLanguages]);

  /**
   * Get tabs configuration - just return the array directly
   */
  const getTabsConfig = useCallback(() => {
    return appConfig.config?.Tabs || [];
  }, [appConfig.config]);

  /**
   * Get application URLs
   */
  const getApplicationUrls = useCallback(() => {
    return appConfig.config?.application || null;
  }, [appConfig.config]);

  /**
   * Check if subscription is enabled
   */
  const isSubscriptionEnabled = useCallback(() => {
    return appConfig.config?.subscription?.isSubscriptionEnabled || false;
  }, [appConfig.config]);

  /**
   * Check if ads are enabled
   */
  const areAdsEnabled = useCallback(() => {
    return appConfig.config?.Ads?.isSplashEnabled || false;
  }, [appConfig.config]);

  /**
   * Get app version info
   */
  const getVersionInfo = useCallback(() => {
    if (!appConfig.config?.application) return null;
    
    return {
      targetVersion: appConfig.config.application.TargetVersion,
      minimumVersion: appConfig.config.application.MinumumVersion,
    };
  }, [appConfig.config]);



  return {
    // State
    config: appConfig.config,
    isLoading: appConfig.isLoading,
    error: appConfig.error,
    lastUpdated: appConfig.lastUpdated,
    isInitialized: appConfig.isInitialized,
    isOnline,
    
    // Actions
    fetchConfig,
    initializeConfig,
    refreshConfig,
    forceReinitialize,
    
    // Getters
    getConfigValue,
    getAvailableLanguages,
    getDefaultLanguage,
    getTabsConfig,
    getApplicationUrls,
    isSubscriptionEnabled,
    areAdsEnabled,
    getVersionInfo,
  };
};

export default useAppConfig;
