import React, { createContext, useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setTheme, setFontSize } from '../store/slices/settingsSlice';
import { createTheme, Theme } from '../themes';
import { FontSize, ThemeMode } from '../store/types';

 interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  fontSize: FontSize;
  setThemeMode: (mode: ThemeMode) => void;
  setFontSizeMode: (size: FontSize) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme: themeMode, fontSize } = useSelector((state: RootState) => state.settings);
  const [theme, setThemeState] = useState<Theme>(() => createTheme(themeMode, fontSize));

  useEffect(() => {
    setThemeState(createTheme(themeMode, fontSize));
  }, [themeMode, fontSize]);

  useEffect(() => {
    const listener: any = ({ colorScheme }: any) => {
      if (themeMode === 'system') {
        setThemeState(createTheme(themeMode, fontSize));
      }
    };

    const subscription = Appearance.addChangeListener(listener);
    return () => subscription?.remove();
  }, [themeMode, fontSize]);

  const setThemeMode = (mode: ThemeMode) => {
    dispatch(setTheme(mode));
  };

  const setFontSizeMode = (size: FontSize) => {
    dispatch(setFontSize(size));
  };

  const toggleTheme = () => {
    const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newMode));
  };

  const value: ThemeContextType = {
    theme,
    themeMode,
    fontSize,
    setThemeMode,
    setFontSizeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar barStyle={!theme.isDark ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.background} translucent />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
