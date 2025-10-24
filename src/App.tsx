import React, { useEffect, useState, useRef } from 'react';
import { Linking } from 'react-native';
import { hideSplash } from 'react-native-splash-view';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MatomoTracker, { MatomoProvider } from 'matomo-tracker-react-native';
import 'react-native-screens/gesture-handler';
import Toast from 'react-native-toast-message';

import { store, persistor } from './store';
import { setConfig, setInitialized } from './store/slices/appConfigSlice';
import { ThemeProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import LocalizationInitializer from './components/LocalizationInitializer';
import { initializeDatabase } from './services/database';
import { OfflineDataService } from './services/database/offline-service';
import { fetchGPIConfig } from './services/api/api';
import { DEFAULT_GPICONFIG } from './utils/constants/default-config';
import { handleMagicLinkLogin } from './utils/magicLinkHandler';
import { GPIConfigResponse } from './types/gpi-config';
import Config from 'react-native-config';
import useAnalytics from './hooks/useAnalytics';
import './localization';

const matomoInstance =
  Config.MATOMO_URL && Config.MATOMO_SITE_ID
    ? new MatomoTracker({
      urlBase: Config.MATOMO_URL,
      siteId: Config.MATOMO_SITE_ID,
    })
    : null;

const useMagicLinkHandler = (
  navigationRef: React.RefObject<any>,
  dispatch: any,
  setMagicHandled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const extractToken = (url: string): string | null => {
    const match = url.match(/sudo\/([^/?#]+)/);
    return match ? match[1] : null;
  };

  const processLink = async (url: string | null) => {
    if (!url) return;
    const token = extractToken(url);
    if (!token || !navigationRef.current) return;

    try {
      const authUrl = 'https://your-api.com/auth/magic-link';
      const profileUrl = 'https://your-api.com/profile';
      await handleMagicLinkLogin(token, dispatch, navigationRef.current, {}, authUrl, profileUrl);
      setMagicHandled(true);
    } catch (error) {
      console.error('❌ Magic link error:', error);
      setMagicHandled(true);
    }
  };

  useEffect(() => {
    // Handle initial launch
    Linking.getInitialURL().then(processLink).catch(console.error);

    // Listen for future links
    const sub = Linking.addEventListener('url', ({ url }) => processLink(url));
    return () => sub.remove();
  }, []);
};

const AppInitializer: React.FC<{
  initialConfig: GPIConfigResponse | null;
  navigationRef: React.RefObject<any>;
  onMagicHandled: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ initialConfig, navigationRef, onMagicHandled }) => {
  const dispatch = useDispatch();
  const { trackAppStart } = useAnalytics();

  // Analytics on start
  useEffect(() => {
    trackAppStart();
  }, [trackAppStart]);

  // Load initial config into Redux
  useEffect(() => {
    if (initialConfig) {
      dispatch(setConfig(initialConfig));
      dispatch(setInitialized(true));
    }
  }, [initialConfig, dispatch]);

  // Handle magic links
  useMagicLinkHandler(navigationRef, dispatch, onMagicHandled);

  return null;
};

const App: React.FC = () => {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [initialConfig, setInitialConfig] = useState<GPIConfigResponse | null>(null);
  const [isMagicHandled, setIsMagicHandled] = useState(false);
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        await Promise.allSettled([initializeDatabase()]);

        // Fetch remote config
        const config = await fetchGPIConfig();
        await OfflineDataService.saveAppConfig(config);
        setInitialConfig(config);
      } catch (error) {
        console.warn('⚠️ Remote config failed, loading offline...');
        try {
          const cached = await OfflineDataService.getAppConfig();
          setInitialConfig(cached || DEFAULT_GPICONFIG);
        } catch {
          setInitialConfig(DEFAULT_GPICONFIG);
        }
      } finally {
        setIsConfigLoaded(true);
      }
    };

    loadConfig();

    // Safety fallback to ensure splash always hides
    const timeout = setTimeout(() => hideSplash(), 7000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isConfigLoaded && isMagicHandled) {
      hideSplash();
    }
  }, [isConfigLoaded, isMagicHandled]);

  const AppContent = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppInitializer initialConfig={initialConfig}
              navigationRef={navigationRef} onMagicHandled={setIsMagicHandled} />
            <ThemeProvider>
              <LocalizationInitializer />
              <AppNavigator ref={navigationRef} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
      <Toast />
    </GestureHandlerRootView>
  );

  if (!matomoInstance) return AppContent;

  return <MatomoProvider instance={matomoInstance}>{AppContent}</MatomoProvider>;
};

export default App;
