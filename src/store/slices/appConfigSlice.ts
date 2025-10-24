import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfigState, GPIConfigResponse } from '../../types/gpi-config';

const initialState: AppConfigState = {
  config: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
  isInitialized: false,
  isOnboardingCompleted: false,
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<GPIConfigResponse>) => {
      state.config = action.payload;
      state.error = null;
      state.lastUpdated = new Date().toISOString();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLastUpdated: (state, action: PayloadAction<string>) => {
      state.lastUpdated = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingCompleted = action.payload;
    },
    clearConfig: (state) => {
      state.config = null;
      state.error = null;
      state.lastUpdated = null;
      state.isInitialized = false;
    },
    resetAppConfig: () => initialState,
  },
});

export const {
  setConfig,
  setLoading,
  setError,
  setLastUpdated,
  setInitialized,
  setOnboardingCompleted,
  clearConfig,
  resetAppConfig,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
