import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CountryPicker from 'react-native-country-picker-modal';
import { DEFAULT_THEME, DARK_THEME } from 'react-native-country-picker-modal/lib/CountryTheme';
import { useTheme } from '../../hooks/useTheme';
import { fontFamily, fontSizes, Theme } from '../../themes';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface TextInputComponentProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'dropdown' | 'country';
  options?: DropdownOption[];
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  error?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
  // Country picker specific props
  countryCode?: any;
  onCountrySelect?: (country: { name: string; cca2: string }) => void;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  options = [],
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  secureTextEntry = false,
  error,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  testID,
  countryCode = '',
  onCountrySelect,
}) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const renderDropdown = () => (
    <Dropdown
      style={[
        styles.dropdown,
        error && styles.inputError,
        disabled && styles.inputDisabled,
        inputStyle,
      ]}
      containerStyle={styles.dropdownContainer}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemTextStyle={styles.itemTextStyle}
      data={options}
      labelField="label"
      valueField="value"
      placeholder={placeholder || 'Select an option'}
      value={value}
      onChange={item => onChangeText(item.value)}
      disable={disabled}
      testID={testID}
    />
  );

  const renderTextInput = () => (
    <TextInput
      style={[
        styles.input,
        error && styles.inputError,
        disabled && styles.inputDisabled,
        inputStyle,
      ]}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      secureTextEntry={secureTextEntry}
      editable={!disabled}
      testID={testID}
    />
  );

  const renderCountryPicker = () => (
    <View style={styles.countryPickerContainer}>
      <CountryPicker
        withFlag
        withCallingCode
        countryCode={countryCode}
        theme={theme.isDark ? DARK_THEME : DEFAULT_THEME}
        withFilter
        withCountryNameButton
        onSelect={(country) => {
          if (onCountrySelect) {
            onCountrySelect({ name: country.name as string, cca2: country.cca2 as string });
          }
          onChangeText(country.name as string);
        }}
        withFlagButton
        withAlphaFilter
        withEmoji
        withCurrency
        containerButtonStyle={[
          styles.countryPickerButton,
          error && styles.inputError,
          disabled && styles.inputDisabled,
          inputStyle,
        ]}
      />

      <Text style={[styles.countryPickerText, value && { color: theme.colors.text }]}>{value || placeholder}</Text>
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>

      {type === 'dropdown' ? renderDropdown() :
        type === 'country' ? renderCountryPicker() : renderTextInput()}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 4,
    },
    label: {
      color: theme.colors.textSecondary,
      fontFamily: fontFamily.light,
      fontSize: fontSizes.medium.sm,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      color: theme.colors.text,
      fontFamily: fontFamily.light,
      fontSize: fontSizes.medium.md,
      height: 48
    },
    dropdown: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      height: 48,
    },
    placeholderStyle: {
      color: theme.colors.textSecondary,
      fontFamily: fontFamily.light,
      fontSize: fontSizes.small.md,
    },
    selectedTextStyle: {
      color: theme.colors.text,
      fontFamily: fontFamily.light,
      fontSize: fontSizes.medium.md,
    },
    itemTextStyle: {
      color: theme.colors.textSecondary,
    },
    dropdownContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.md,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    inputDisabled: {
      backgroundColor: theme.colors.backgroundSecondary,
      borderColor: theme.colors.border,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
    // Country picker styles
    countryPickerContainer: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      height: 48,
      justifyContent: 'center',
    },
    countryPickerButton: {
      height: 48,
      paddingHorizontal: theme.spacing.md,
      zIndex: 99, opacity: 0,
    },
    countryPickerText: {
      paddingHorizontal: theme.spacing.md,
      color: theme.colors.textSecondary,
      fontFamily: fontFamily.light,
      fontSize: fontSizes.small.md,
      position: 'absolute', zIndex: -1,
    },
  });

export default TextInputComponent;