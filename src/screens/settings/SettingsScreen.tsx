import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setTheme, setFontSize } from '../../store/slices/settingsSlice';
import { useTheme } from '../../hooks/useTheme';
import useAnalytics from '../../hooks/useAnalytics';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { trackEvent } = useAnalytics();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { theme: currentTheme, fontSize, language } = useSelector((state: RootState) => state.settings);
  const navigation = useNavigation();


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: insets.top,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
    },
    title: {
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.sm,
    },
    optionText: {
      color: theme.colors.text,
    },
    optionValue: {
      color: theme.colors.text,
    },
  });

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(newTheme));
    trackEvent('settings', 'themeChange', newTheme);
  };

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large' | 'xlarge') => {
    dispatch(setFontSize(newSize));
    trackEvent('settings', 'fontSizeChange', newSize);
  };
  const showThemeOptions = () => {
    Alert.alert(
      t('settings.theme'),
      '',
      [
        { text: t('settings.lightTheme'), onPress: () => handleThemeChange('light') },
        { text: t('settings.darkTheme'), onPress: () => handleThemeChange('dark') },
        { text: t('settings.systemTheme'), onPress: () => handleThemeChange('system') },
        { text: t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const showFontSizeOptions = () => {
    Alert.alert(
      t('settings.fontSize'),
      '',
      [
        { text: t('settings.smallFont'), onPress: () => handleFontSizeChange('small') },
        { text: t('settings.mediumFont'), onPress: () => handleFontSizeChange('medium') },
        { text: t('settings.largeFont'), onPress: () => handleFontSizeChange('large') },
        { text: t('settings.xlargeFont'), onPress: () => handleFontSizeChange('xlarge') },
        { text: t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const showLanguageOptions = () => {
    navigation.navigate('LanguageSelector' as never);
  };

  const getThemeText = () => {
    switch (currentTheme) {
      case 'light': return t('settings.lightTheme');
      case 'dark': return t('settings.darkTheme');
      case 'system': return t('settings.systemTheme');
      default: return t('settings.systemTheme');
    }
  };

  const getFontSizeText = () => {
    switch (fontSize) {
      case 'small': return t('settings.smallFont');
      case 'medium': return t('settings.mediumFont');
      case 'large': return t('settings.largeFont');
      case 'xlarge': return t('settings.xlargeFont');
      default: return t('settings.mediumFont');
    }
  };

  const getLanguageText = () => {
    switch (language) {
      case 'en': return t('settings.english');
      case 'fr': return t('settings.french');
      case 'es': return t('settings.spanish');
      default: return t('settings.english');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.theme')}</Text>
          <TouchableOpacity style={styles.option} onPress={showThemeOptions}>
            <Text style={styles.optionText}>{t('settings.theme')}</Text>
            <Text style={styles.optionValue}>{getThemeText()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.fontSize')}</Text>
          <TouchableOpacity style={styles.option} onPress={showFontSizeOptions}>
            <Text style={styles.optionText}>{t('settings.fontSize')}</Text>
            <Text style={styles.optionValue}>{getFontSizeText()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={showLanguageOptions}>
            <Text style={styles.optionText}>{t('settings.language')}</Text>
            <Text style={styles.optionValue}>{getLanguageText()}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
