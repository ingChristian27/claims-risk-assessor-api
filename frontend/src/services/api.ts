import axios, { AxiosError } from 'axios';
import type { Claim, CreateClaimRequest } from '@types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add logging in development
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Centralized error handling
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
    }

    // Transform error messages for better UX
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access denied.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 422:
          errorMessage = 'Validation error. Please check your input.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
        case 503:
          errorMessage = 'Service temporarily unavailable. Please try again.';
          break;
        default:
          errorMessage = `Error: ${error.response.status}`;
      }
    } else if (error.request) {
      // Request made but no response
      errorMessage = 'Network error. Please check your internet connection.';
    }

    // Attach user-friendly message to error
    const enhancedError = new Error(errorMessage);
    enhancedError.cause = error;

    return Promise.reject(enhancedError);
  }
);

// Claims API
export const createClaim = async (data: CreateClaimRequest): Promise<Claim> => {
  const response = await api.post('/claims', data);
  return response.data;
};

export const getClaimById = async (id: string): Promise<Claim> => {
  const response = await api.get(`/claims/${id}`);
  return response.data;
};

export default api;

