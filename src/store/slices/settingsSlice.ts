import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, ThemeMode, FontSize, Language } from '../types';

const initialState: SettingsState = {
  theme: 'system',
  fontSize: 'medium',
  language: 'en',
  isFirstLaunch: true,
  notificationsEnabled: true,
  biometricEnabled: false,
  editSectionCustomizationList: [],
  apperenceIndex: 1,
  isLightTheme: true,
  langImage: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<FontSize>) => {
      state.fontSize = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setBiometricEnabled: (state, action: PayloadAction<boolean>) => {
      state.biometricEnabled = action.payload;
    },
    setEditSectionCustomizationList: (state, action: PayloadAction<any[]>) => {
      state.editSectionCustomizationList = action.payload;
    },
    ChangeFontSize: (state, action: PayloadAction<number>) => {
      // Convert numeric font size to FontSize type
      const sizeMap :any = { 0: 'small', 1: 'medium', 2: 'large', 3: 'xlarge' };
      state.fontSize = sizeMap[action.payload] || 'medium';
    },
    setApperenceIndex: (state, action: PayloadAction<number>) => {
      state.apperenceIndex = action.payload;
    },
    setLightTheame: (state, action: PayloadAction<boolean>) => {
      state.isLightTheme = action.payload;
    },
    setLangImage: (state, action: PayloadAction<string>) => {
      state.langImage = action.payload;
    },
    resetSettings: (state) => {
      state.theme = 'system';
      state.fontSize = 'medium';
      state.language = 'en';
      state.notificationsEnabled = true;
      state.biometricEnabled = false;
      state.editSectionCustomizationList = [];
      state.apperenceIndex = 1;
      state.isLightTheme = true;
      state.langImage = 'en';
    },
  },
});

export const {
  setTheme,
  setFontSize,
  setLanguage,
  setFirstLaunch,
  setNotificationsEnabled,
  setBiometricEnabled,
  setEditSectionCustomizationList,
  ChangeFontSize,
  setApperenceIndex,
  setLightTheame,
  setLangImage,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
