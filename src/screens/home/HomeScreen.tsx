import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { fontFamily } from '../../themes/typography';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

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
    subtitle: {
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    text: {
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.recentActivity')}</Text>
        <Text style={styles.text}>{t('home.noData')}</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
