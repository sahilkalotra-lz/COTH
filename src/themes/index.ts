import { Appearance } from 'react-native';
import { lightColors, darkColors, ColorScheme } from './colors';
import { getTypography, FontSize } from './typography';
import { spacing, verticalSpacing, borderRadius, shadows } from './spacing';
import { ThemeMode } from '../store/types';

export interface Theme {
  colors: ColorScheme;
  spacing: typeof spacing;
  verticalSpacing: typeof verticalSpacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  isDark: boolean;
}

export const createTheme = (themeMode: ThemeMode, fontSize: FontSize): Theme => {
  const systemColorScheme = Appearance.getColorScheme();
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');
  
  return {
    colors: isDark ? darkColors : lightColors,
    spacing,
    verticalSpacing,
    borderRadius,
    shadows,
    isDark,
  };
};

export { lightColors, darkColors } from './colors';
export { getTypography, fontSizes, fontFamily, letterSpacings } from './typography';
export { spacing, verticalSpacing, borderRadius, shadows } from './spacing';
