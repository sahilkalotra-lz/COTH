import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export const fontSizes = {
  small: {
    xs: scale(10),
    sm: scale(12),
    md: scale(14),
    lg: scale(16),
    xl: scale(18),
    xxl: scale(20),
    xxxl: scale(24),
  },
  medium: {
    xs: scale(12),
    sm: scale(14),
    md: scale(16),
    lg: scale(18),
    xl: scale(20),
    xxl: scale(22),
    xxxl: scale(26),
  },
  large: {
    xs: scale(14),
    sm: scale(16),
    md: scale(18),
    lg: scale(20),
    xl: scale(22),
    xxl: scale(24),
    xxxl: scale(28),
  },
  xlarge: {
    xs: scale(16),
    sm: scale(18),
    md: scale(20),
    lg: scale(22),
    xl: scale(24),
    xxl: scale(26),
    xxxl: scale(30),
  },
};

export const fontFamily = {
  light: 'Lexend-Light',
  regular: 'Lexend-Regular',
  medium: 'Lexend-Medium',
  semiBold: 'Lexend-SemiBold',
  bold: 'Lexend-Bold',
  extraBold: 'Lexend-ExtraBold',
  black: 'Lexend-Black',
  thin: 'Lexend-Thin',
  extraLight: 'Lexend-ExtraLight',
};


export const letterSpacings = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 1.5,
};

export const typography = {
  // Headings
  h1: {
    fontSize: fontSizes.medium.xxxl,
    fontFamily: fontFamily.bold,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontSize: fontSizes.medium.xxl,
    fontFamily: fontFamily.bold,
    letterSpacing: letterSpacings.tight,
  },
  h3: {
    fontSize: fontSizes.medium.xl,
    fontFamily: fontFamily.semiBold,
    letterSpacing: letterSpacings.normal,
  },
  h4: {
    fontSize: fontSizes.medium.lg,
    fontFamily: fontFamily.semiBold,
    letterSpacing: letterSpacings.normal,
  },
  h5: {
    fontSize: fontSizes.medium.md,
    fontFamily: fontFamily.medium,      
    letterSpacing: letterSpacings.normal,
  },
  h6: {
    fontSize: fontSizes.medium.sm,
    fontFamily: fontFamily.medium,    
    letterSpacing: letterSpacings.normal,
  },
  
  // Body text
  body1: {
    fontSize: fontSizes.medium.md,
    fontFamily: fontFamily.regular,
    letterSpacing: letterSpacings.normal,
  },
  body2: {
    fontSize: fontSizes.medium.sm,
    fontFamily: fontFamily.regular,
    letterSpacing: letterSpacings.normal,
  },
  
  // Caption and small text
  caption: {
    fontSize: fontSizes.medium.xs,
    fontFamily: fontFamily.regular,
    letterSpacing: letterSpacings.wide,
  },
  
  // Button text
  button: {
    fontSize: fontSizes.medium.md,
    fontFamily: fontFamily.semiBold,
    letterSpacing: letterSpacings.wide,
  },
  
  // Overline
  overline: {
    fontSize: fontSizes.medium.xs,
    fontFamily: fontFamily.medium,
    letterSpacing: letterSpacings.widest,
    textTransform: 'uppercase' as const,
  },
};

export const getTypography = (fontSize: FontSize) => {
  const sizes = fontSizes[fontSize];
  
  return {
    ...typography,
    h1: { ...typography.h1, fontSize: sizes.xxxl },
    h2: { ...typography.h2, fontSize: sizes.xxl },
    h3: { ...typography.h3, fontSize: sizes.xl },
    h4: { ...typography.h4, fontSize: sizes.lg },
    h5: { ...typography.h5, fontSize: sizes.md },
    h6: { ...typography.h6, fontSize: sizes.sm },
    body1: { ...typography.body1, fontSize: sizes.md },
    body2: { ...typography.body2, fontSize: sizes.sm },
    caption: { ...typography.caption, fontSize: sizes.xs },
    button: { ...typography.button, fontSize: sizes.md },
    overline: { ...typography.overline, fontSize: sizes.xs },
  };
};
