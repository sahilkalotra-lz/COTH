declare module 'matomo-tracker-react-native' {
  import { ReactNode } from 'react';

  export interface MatomoTrackerConfig {
    urlBase: string;
    siteId: string;
  }

  export interface MatomoProviderProps {
    instance: MatomoTrackerConfig;
    children: ReactNode;
  }

  export interface MatomoContextValue {
    trackAppStart(): void;
    trackScreenView(params: { name: string; title?: string }): void;
    trackEvent(params: { category: string; action: string; name?: string; value?: number }): void;
    setUserId(userId: string): void;
    setCustomVariable(index: number, name: string, value: string): void;
  }

  export const MatomoProvider: React.FC<MatomoProviderProps>;
  export const useMatomo: () => MatomoContextValue;
  export default MatomoTracker;
}
