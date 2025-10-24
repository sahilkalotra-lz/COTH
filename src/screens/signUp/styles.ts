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
    contentContainer: {
      gap: 8,
    },
    inputContainer: {
      gap: 16,
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
    countryPickerContainer: { flexDirection: 'row', width: '100%', alignItems: 'center', gap: 4 },
    checkboxContainer: {
      flexDirection: 'row',
      gap: 8, 
    },
    checkbox: {
      width: 16,
      height: 16,
      borderWidth: 1,
      borderColor: colors.checkbox,
      borderRadius: 4,
      marginVertical:3
    },
    checkboxText: {
      fontSize: fontSizes.small.md,
      color: theme.colors.text,
      fontFamily: fontFamily.light,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3
    },
    signUpText: {
      fontSize: fontSizes.medium.md,
      color: theme.colors.text,
      fontFamily: fontFamily.light,
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
    // Country Picker Styles
    inputWrapper: { gap: 4, flex: 0.5 },
    inputLabel: {
      fontSize: fontSizes.medium.md,
      color: theme.colors.textSecondary,
      fontFamily: fontFamily.light,
    },
    countryPickerButton: {
      backgroundColor: theme.colors.background,
      opacity:0,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      height: 48,
      justifyContent: 'center', paddingHorizontal: theme.spacing.md,
    },
    countryPickerText: {
      fontSize: fontSizes.medium.md,
      color: theme.colors.textSecondary,
      fontFamily: fontFamily.light,
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: fontSizes.small.sm,
      color: theme.colors.error,
      fontFamily: fontFamily.light,
      marginTop: 4,
      marginLeft: 4,
    },
  });

export default createStyles;
