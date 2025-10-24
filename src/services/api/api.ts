import { GPIConfigResponse } from '../../types/gpi-config';
import { API_ENDPOINTS } from './endpoints';
import axiosInstance from './axios';

export const fetchQueryApi = async (url: string) => {
  const response = await axiosInstance.get<any>(url);
  return response;
};

export const postApi = async (url: string, data: any) => {
  const response = await axiosInstance.post<any>(url, data);
  return response.data;
};

/**
 * Fetch GPI configuration directly from API
 */
export const fetchGPIConfig = async (): Promise<GPIConfigResponse> => {
  const response = await axiosInstance.get<GPIConfigResponse>(API_ENDPOINTS.GPI_CONFIG);
  return response.data;
};

export const registerUser = async (url: string, data: any): Promise<any> => {
  const response = await axiosInstance.post<any>(url, data);
  return response.data;
};

export const loginUser = async (url: string, data: any): Promise<any> => {
  const response = await axiosInstance.post<any>(url, data);
  return response.data;
};

export const getUserProfile = async (url: string): Promise<any> => {
  const response = await axiosInstance.get<any>(url);
  return response.data;
};

export const sendOtpToEmail = async (url: string, data: any): Promise<any> => {
  const response = await axiosInstance.post<any>(url, data);
  return response.data;
};

export const verifyOtp = async (url: string, data: any): Promise<any> => {
  const response = await axiosInstance.post<any>(url, data);
  return response.data;
};
