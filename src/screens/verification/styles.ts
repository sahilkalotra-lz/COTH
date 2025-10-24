import { StyleSheet } from 'react-native';
import { fontFamily, fontSizes, Theme } from '../../themes';
import { colors } from '../../themes/colors';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 24,
    },
    header: {
      alignItems: 'center',
    },
    logo: {
      width: '100%',
      height: 60,
      marginBottom: 8,
    },
    contentContainer: {
      gap: 8,
    },
    title: {
      fontSize: fontSizes.small.xxxl,
      color: theme.colors.text,
      textAlign: 'center',
      fontFamily: fontFamily.medium,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: theme.colors.text,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
    },
    signUpText: {
      fontSize: fontSizes.medium.md,
      color: theme.colors.text,
      fontFamily: fontFamily.light,
      flexShrink: 1,
      textAlign: 'center',
    },
    signUpLink: {
      fontSize: fontSizes.medium.md,
      color: colors.blue,
      fontFamily: fontFamily.light,
    },
    skipButton: {
      marginTop: 24,
      alignItems: 'center',
    },
    skipButtonText: {
      fontSize: fontSizes.medium.md,
      color: theme.colors.textSecondary,
      textDecorationLine: 'underline',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
    },
    otpInput: {
      width: 48,
      height: 48,
      borderWidth: 1,
      borderColor: colors.checkbox,
      borderRadius: 8,
      backgroundColor: theme.colors.background,
      textAlign: 'center',
      fontSize: fontSizes.medium.md,
      fontFamily: fontFamily.light,
      color: theme.colors.text,
    },
    otpInputFocused: {
      borderColor: colors.blue,
      borderWidth: 1,
    },
    errorText: {
      fontSize: fontSizes.medium.sm,
      color: theme.colors.error,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 16,
      fontFamily: fontFamily.regular,
    },
  });

export default createStyles;
