import { makeAuthService } from '@/application/domain/auth/services/make-auth-service';
import axios, { AxiosError } from 'axios';

export type HttpAxiosError = AxiosError<{ messages: string[] }>;

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_KEY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const authService = makeAuthService();

    const { accessToken } = authService.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const authService = makeAuthService();
      authService.logout({ shallRedirect: true });
    }
    return Promise.reject(error);
  }
);
