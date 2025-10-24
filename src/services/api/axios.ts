import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo';
import { store } from '../../store';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ANSI color codes
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';

// Log functions
const logRequest = (config: any) => {
  console.log(`\n${CYAN}REQUEST → ${config.method?.toUpperCase()} ${config.url}${RESET}`);
  if (config) console.log(`${YELLOW}Body: ${JSON.stringify(config.data, null, 2)}`);
};

const logResponse = (response: AxiosResponse) => {
  console.log(`${GREEN}RESPONSE ← ${response.status} ${response.config.url}${RESET}`);
  if (response) console.log(`${GREEN}Data: ${JSON.stringify(response, null, 2)}`);
};

const logError = (error: any) => {
  console.log(`${RED}ERROR ← ${error.response?.status || 'NETWORK'} ${error.config?.url}${RESET}`);
  if (error.response?.data) console.log(`${RED}Error Data:`, error.response.data, RESET);
  else console.log(`${RED}Error Message:`, error.message, RESET);
};

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) throw new Error('No internet connection');

    try {
      const state = store.getState();
      const token = state.auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('No user token found in Redux, proceeding without authorization');
    }

    logRequest(config);
    return config;
  },
  (error) => {
    logError(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logResponse(response);
    return response;
  },
  (error) => {
    logError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
