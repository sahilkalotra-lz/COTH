import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { STRINGS } from '../../utils/constants';

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  const handleSignIn = () => {
    navigation.navigate('SignIn' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
  };

  const handleLogout = () => {
    Alert.alert(
      STRINGS.SIGN_OUT_TITLE,
      STRINGS.SIGN_OUT_DESCRIPTION,
      [
        { text: STRINGS.CANCEL, style: 'cancel' },
        { 
          text: STRINGS.SIGN_OUT_BUTTON, 
          style: 'destructive',
          onPress: () => {}
        },
      ]
    );
  };

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
    text: {
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    authSection: {
      marginTop: theme.spacing.xl,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: 12,
    },
    authTitle: {
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    authText: {
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
      gap: theme.spacing.md,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    secondaryButtonText: {
      color: theme.colors.primary,
    },
    userInfo: {
      backgroundColor: theme.colors.backgroundSecondary,
      padding: theme.spacing.lg,
      borderRadius: 12,
      marginBottom: theme.spacing.lg,
    },
    userName: {
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    userEmail: {
      color: theme.colors.textSecondary,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('profile.title')}</Text>
        <Text style={styles.text}>{t('profile.personalInfo')}</Text>

        {isAuthenticated && user ? (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Welcome, {user.name}!</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={handleLogout}
              disabled={isLoading}
            >
              <Text style={styles.logoutButtonText}>
                {isLoading ? 'Signing Out...' : 'Sign Out'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authSection}>
            <Text style={styles.authTitle}>Sign In to Your Account</Text>
            <Text style={styles.authText}>
              Sign in to access personalized features and sync your data across devices.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]} 
                onPress={handleSignUp}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
