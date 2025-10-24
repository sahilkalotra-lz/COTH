import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { GPITab } from './gpi-config';

export type RootStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Main: NavigatorScreenParams<TabStackParamList>;
  LanguageSelector: undefined;
  VerificationCode: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    countryCode: string;
    gender: string;
    checked: boolean;
    deviceId: string;
    deviceType: string;
  };
};

export type TabStackParamList = {
  // Dynamic tab names based on GPI config
  [key: string]: {
    // For pager type tabs
    pager?: {
      ArticleId?: string;
    };
    // For video type tabs
    videos?: undefined;
    videoMedia?: {
      VideoIid: string;
    };
  };
};


export interface DeepLinkParams {
  login?: undefined;
  register?: undefined;
  setting?: undefined;
  subscription?: undefined;
  app?: {
    welcome?: {
      article?: {
        ArticleId: string;
      };
    };
    videos?: {
      videos?: undefined;
      videoMedia?: {
        VideoIid: string;
      };
    };
  };
}


// Root Stack Screen Props
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

// Tab Stack Screen Props
export type TabStackScreenProps<T extends keyof TabStackParamList> = 
  BottomTabScreenProps<TabStackParamList, T>;

export type NavigationContainerRef = React.RefObject<any>;

export interface TabConfiguration {
  id: string;
  tabTitle: string;
  icon: string;
  type: 'pager' | 'rubric' | 'video_section';
  rubric_id: string | null;
  pages: GPITab['pages'];
}

export interface TabIconState {
  [key: string]: string;
}

// ============================================================================
// CUSTOM TAB BAR TYPES
// ============================================================================

export interface CustomTabBarProps {
  state: {
    routes: Array<{
      name: string;
      key: string;
    }>;
    index: number;
  };
  navigation: any;
  icons: TabIconState;
  tabs: TabConfiguration[];
}

// ============================================================================
// TAB CONTENT COMPONENT TYPES
// ============================================================================

export interface TabContentProps {
  tab: TabConfiguration;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface ScreenTrackingParams {
  routeName: string;
  screenName?: string;
}

// ============================================================================
// THEME CONTAINER TYPES
// ============================================================================

export interface NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  fonts: {
    regular: { fontFamily: string; fontWeight: '400' | '500' | '700' | '800' | 'bold' | 'normal' | '100' | '200' | '300' | '600' | '900' };
    medium: { fontFamily: string; fontWeight: '400' | '500' | '700' | '800' | 'bold' | 'normal' | '100' | '200' | '300' | '600' | '900' };
    bold: { fontFamily: string; fontWeight: '400' | '500' | '700' | '800' | 'bold' | 'normal' | '100' | '200' | '300' | '600' | '900' };
    heavy: { fontFamily: string; fontWeight: '400' | '500' | '700' | '800' | 'bold' | 'normal' | '100' | '200' | '300' | '600' | '900' };
  };
}

// ============================================================================
// LINKING CONFIGURATION TYPES
// ============================================================================

export interface LinkingConfig {
  prefixes: string[];
  config: {
    screens: {
      login: { path: string };
      register: { path: string };
      setting: { path: string };
      subscription: { path: string };
      bottomTab: {
        path: string;
        screens: {
          Welcome_0: {
            path: string;
            screens: {
              pager: {
                path: string;
                parse: {
                  ArticleId: (ArticleId: string) => string;
                };
              };
            };
          };
          Videos: {
            screens: {
              videos: { path: string };
              videoMedia: {
                path: string;
                parse: {
                  VideoIid: (VideoIid: string) => string;
                };
              };
            };
          };
        };
      };
    };
  };
}
