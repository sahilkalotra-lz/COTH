/**
 * API Endpoints Configuration
 * Centralized location for all API endpoints
 */
const version = 'v1';
export const API_ENDPOINTS = {
  // GPI Configuration endpoints
  GPI_CONFIG: `/api/MobileControllerGPIRN/${version}/iphone/GPIConfig`,
  
  // Add other endpoints here as needed
  // GPI_ARTICLES: '/api/MobileControllerGPIRN/v1/iphone/articles',
  // GPI_SEARCH: '/api/MobileControllerGPIRN/v1/iphone/search',
} as const;
