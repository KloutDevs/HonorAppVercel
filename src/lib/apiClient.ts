import axios, { type AxiosInstance, type AxiosError } from 'axios';
import Cookies from 'js-cookie';
import type { ApiResponse } from '@/types/api';

class ApiClient {
  private api: AxiosInstance;
  private baseURL: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'https://staging-ht-service.app.ordev.tech/api';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 300000, // 5 minutos para peticiones normales
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - configura tokens
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Maneja el refresh del access token
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as typeof error.config & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.api(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshToken();
            this.processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.removeAccessToken();
            localStorage.removeItem('user');

            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }

            return Promise.reject(new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: unknown, token: string | null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  getAccessToken(): string | null {
    return Cookies.get('accessToken') || null;
  }

  setAccessToken(token: string) {
    Cookies.set('accessToken', token, {
      expires: 1/96,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  removeAccessToken() {
    Cookies.remove('accessToken');
  }

  private async refreshToken(): Promise<string> {
    try {
      const refreshApi = axios.create({
        baseURL: this.baseURL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`
        },
      });

      const response = await refreshApi.post('/user/refresh-token', {});
      
      const { token, user } = response.data.data;
      this.setAccessToken(token);
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return token;
    } catch (error) {
      throw error;
    }
  }

  // Métodos HTTP genéricos
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    params?: { headers?: { 'Content-Type'?: string } }
  ): Promise<ApiResponse<T>> {
    try {
      let config = {};
      
      if (data instanceof FormData) {
        config = {
          timeout: 1800000,
          headers: {
            ...params?.headers,
            'Content-Type': undefined
          }
        };
      } else if (params?.headers) {
        config = { headers: params.headers };
      }
      
      const response = await this.api.post<ApiResponse<T>>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    params?: { headers?: { 'Content-Type'?: string } }
  ): Promise<ApiResponse<T>> {
    try {
      let config = {};
      
      if (data instanceof FormData) {
        config = {
          timeout: 1800000,
          headers: {
            ...params?.headers,
            'Content-Type': undefined
          }
        };
      } else if (params?.headers) {
        config = { headers: params.headers };
      }
      
      const response = await this.api.put<ApiResponse<T>>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    params?: { headers?: { 'Content-Type'?: string } }
  ): Promise<ApiResponse<T>> {
    try {
      let config = {};
      
      if (data instanceof FormData) {
        config = {
          timeout: 1800000,
          headers: {
            ...params?.headers,
            'Content-Type': undefined
          }
        };
      } else if (params?.headers) {
        config = { headers: params.headers };
      }
      
      const response = await this.api.patch<ApiResponse<T>>(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Error en la petición';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('Error desconocido');
  }
}

export const apiClient = new ApiClient();
export default apiClient;