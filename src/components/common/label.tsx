// components/common/label.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getTypography } from '../../themes';
import { FontSize } from '../../store/types';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2' 
  | 'caption' 
  | 'button' 
  | 'overline';

interface LabelProps extends TextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  fontSize?: FontSize;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Label: React.FC<LabelProps> = ({
  children,
  variant = 'body1',
  color,
  fontSize = 'medium',
  align = 'left',
  numberOfLines,
  ellipsizeMode,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const typography = getTypography(fontSize);
  
  // Get the typography style for the variant
  const variantStyle = typography[variant];
  
  // Determine text color
  const textColor = color || theme.colors.text;
  
  const textStyle = [
    variantStyle,
    { 
      color: textColor,
      textAlign: align,
    },
    style, // allows overriding styles when using the component
  ];

  return (
    <Text 
      style={textStyle} 
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Label;
