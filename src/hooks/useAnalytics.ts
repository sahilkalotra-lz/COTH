import { useMatomo } from 'matomo-tracker-react-native';

/**
 * Custom hook for analytics tracking using Matomo
 * This hook provides a clean interface for tracking events, screen views, and user data
 */
export const useAnalytics = () => {
  const matomo = useMatomo();
  
  // Provide fallback functions if Matomo is not available
  const trackAppStart = matomo?.trackAppStart || (() => {});
  const trackScreenView = matomo?.trackScreenView || (() => {});
  const trackEvent = matomo?.trackEvent || (() => {});
  const setUserId = matomo?.setUserId || (() => {});
  const setCustomVariable = matomo?.setCustomVariable || (() => {});

  const trackScreen = (screenName: string, screenTitle?: string) => {
    trackScreenView({
      name: screenName,
      title: screenTitle || screenName,
    });
    console.log(`📊 Screen view tracked: ${screenName}`);
  };

  const trackUserEvent = (category: string, action: string, name?: string, value?: number) => {
    trackEvent({
      category,
      action,
      name,
      value,
    });
    console.log(`📊 Event tracked: ${category} - ${action}${name ? ` - ${name}` : ''}`);
  };

  const trackError = (error: string, context?: string) => {
    trackUserEvent('Error', 'Occurred', error);
    if (context) {
      setCustomVariable(1, 'Error Context', context);
    }
  };

  const setUser = (userId: string) => {
    setUserId(userId);
    console.log(`📊 User ID set: ${userId}`);
  };

  const setCustomVar = (index: number, name: string, value: string) => {
    setCustomVariable(index, name, value);
    console.log(`📊 Custom variable set: ${name} = ${value}`);
  };

  return {
    trackAppStart,
    trackScreen,
    trackEvent: trackUserEvent,
    trackError,
    setUserId: setUser,
    setCustomVariable: setCustomVar,
  };
};

export default useAnalytics;
