export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  magicLinkLoginLoading: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type Language = 'en' | 'fr' | 'es';

export interface SettingsState {
  theme: ThemeMode;
  fontSize: FontSize;
  language: Language;
  isFirstLaunch: boolean;
  notificationsEnabled: boolean;
  biometricEnabled: boolean;
  editSectionCustomizationList: any[];
  apperenceIndex: number;
  isLightTheme: boolean;
  langImage: string;
}

import { AppConfigState } from '../../types/gpi-config';

export interface RootState {
  auth: AuthState;
  settings: SettingsState;
  appConfig: AppConfigState;
}
