import React, { forwardRef } from 'react';
import { NavigationContainer, NavigationContainerRef as RNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '../hooks/useTheme';
import { useAnalytics } from '../hooks/useAnalytics';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TabNavigator from './TabNavigator';
import OnboardingCarousel from '../screens/onboarding/OnboardingCarousel';
import SignInScreen from '../screens/signIn/SignInScreen';
import SignUpScreen from '../screens/signUp/SignUpScreen';
import LanguageSelector from '../screens/settings/LanguageSelector';
import VerificationCodeScreen from '../screens/verification/VerificationCode';
import { 
  RootStackParamList, 
  NavigationTheme, 
  LinkingConfig 
} from '../types/navigation';

const config: LinkingConfig['config'] = {
  screens: {
    // Magic link handling is done before navigation, so no route needed
    login: {
      path: 'login',
    },
    register: {
      path: 'register',
    },
    setting: {
      path: 'setting',
    },
    subscription: {
      path: 'subscription',
    },
    bottomTab: {
      path: 'app', // Define a path for the bottomTab deep link
      screens: {
        Welcome_0: {
          path: 'welcome',
          screens: {
            pager: {
              path: 'article/:ArticleId',
              parse: {
                ArticleId: (ArticleId: string) => `${ArticleId}`,
              },
            },
          },
        },
        Videos: {
          screens: {
            videos: {
              path: 'videos',
            },
            videoMedia: {
              path: 'videosRubric/:VideoIid',
              parse: {
                VideoIid: (VideoIid: string) => `${VideoIid}`,
              },
            },
          },
        },
      },
    },
  },
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = forwardRef<RNavigationContainerRef<any>, {}>((props, ref) => {
  const { theme } = useTheme();
  const { trackScreen } = useAnalytics();
  const { isOnboardingCompleted } = useSelector((state: RootState) => state.appConfig);

  const containerTheme: NavigationTheme = {
    dark: theme.isDark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.backgroundSecondary,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: '700' as const },
      heavy: { fontFamily: 'System', fontWeight: '800' as const },
    },
  }
  const linking: LinkingConfig = {
    prefixes: ['gpi://', 'http://grandprix.info'],
    config,
  };
  // https://grandprix.info/sudo/ec710154-077f-4ed1-87e8-fd10776af229?target=app
  return (
    <NavigationContainer
      ref={ref}
      theme={containerTheme}
      linking={linking}
      onStateChange={(state) => {
        if (!state) return;
        const routeName = state.routes[state.index]?.name;
        // if (routeName) trackScreen(routeName);
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {isOnboardingCompleted ? (
          <Stack.Screen name="Onboarding" component={OnboardingCarousel} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
            <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
