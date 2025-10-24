import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';

import { useTheme } from '../hooks/useTheme';
import { useAnalytics } from '../hooks/useAnalytics';
import { RootState } from '../store';
import { 
  TabStackParamList, 
  TabConfiguration, 
  TabIconState, 
  CustomTabBarProps, 
  TabContentProps 
} from '../types/navigation';

import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<TabStackParamList>();

/** ---------------- Custom Hook for fetching icons ---------------- */
const useTabIcons = (tabs: TabConfiguration[]) => {
  const [icons, setIcons] = useState<TabIconState>({});

  useEffect(() => {
    const fetchIcons = async () => {
      const urls: Record<string, string> = {};
      for (const tab of tabs) {
        try {
          const response = await fetch(`${Config.BottomTab_Icons_API}${tab.icon}.png`);
          urls[tab.icon] = response.url;
        } catch (err) {
          console.error(`Error fetching icon "${tab.icon}":`, err);
        }
      }
      setIcons(urls);
    };

    fetchIcons();
  }, [tabs]);

  return icons;
};

/** ---------------- Component for tab screen content ---------------- */
const TabContent: React.FC<TabContentProps> = ({ tab }) => {
  const { theme } = useTheme();

  switch (tab.type) {
    case 'pager':
      return <HomeScreen />;
    case 'rubric':
      return <ProfileScreen />;
    case 'video_section':
      return <SettingsScreen />;
    default:
      return (
        <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{tab.tabTitle}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            Unknown Tab Type
          </Text>
        </View>
      );
  }
};

/** ---------------- Custom Tab Bar Component ---------------- */
const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, navigation, icons, tabs }) => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const tabCount = tabs.length;
  const tabBarWidth = Math.max(120, tabCount * 50 + 20);

  return (
    <View style={[styles.tabBarContainer,
    { backgroundColor: theme.colors.backgroundTertiary, bottom: bottom + 5, width: tabBarWidth }]} >
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;
        const tab = tabs[index];
        const iconUrl = icons[tab.icon];

        return (
          <TouchableOpacity key={tab.id} onPress={() => navigation.navigate(route.name)}
            style={[styles.tabBarItem,
            { backgroundColor: focused ? theme.colors.primary : 'transparent' }]}  >
            <Image source={{ uri: iconUrl }}
              style={{
                width: 22, height: 18,
                tintColor: focused ? theme.colors.tabActive : theme.colors.tabInactive,
              }} resizeMode="contain" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/** ---------------- Main Tab Navigator ---------------- */
const TabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const { trackScreen } = useAnalytics();
  const { config, isLoading, error } = useSelector((state: RootState) => state.appConfig);

  const tabs: TabConfiguration[] = config?.Tabs || [{ id: '1', icon: 'home', tabTitle: 'Home', type: 'pager', rubric_id: null, pages: null }];
  const icons = useTabIcons(tabs);

  if (isLoading) {
    return (
      <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading tabs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error, textAlign: 'center' }}>
          Error loading tabs: {error}
        </Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBar={(props) => <CustomTabBar {...props} icons={icons} tabs={tabs} />}
      screenListeners={{
        tabPress: (e) => {
          const routeName = e.target?.split('-')[0];
          if (routeName) trackScreen(routeName);
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.id} name={tab.tabTitle}>
          {() => <TabContent tab={tab} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

/** ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },

  tabBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 100,
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
  tabBarItem: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,

  },
});

export default TabNavigator;
