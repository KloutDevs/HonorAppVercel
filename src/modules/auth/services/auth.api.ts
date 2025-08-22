import { apiClient } from '@/lib/apiClient';
import type { User, ApiResponse } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  phone: string;
  verification_code: string;
  referred_by?: string;
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: User;
  token: string;
}

export interface RegisterResponseData {
  message: string;
}

export interface InitiateEmailVerificationRequest {
  email: string;
}

export interface CheckEmailVerificationRequest {
  email: string;
  verification_code: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export const authApi = {

  initiateEmailVerification: async (data: InitiateEmailVerificationRequest) => {
    return await apiClient.post<{ message: string }>('/verified-emails/initiate', data);
  },

  checkEmailVerification: async (data: CheckEmailVerificationRequest) => {
    return await apiClient.post<{ message: string }>('/verified-emails/check', data);
  },

  login: async (data: LoginRequest) => {
    const response = await apiClient.post<LoginResponseData>('/user/login', data);
    if (response.data && response.data.token) {
      apiClient.setAccessToken(response.data.token);
    }
    return response;
  },

  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<RegisterResponseData>('/user/register', data);
    return response;
  },

  logout: async () => {
    try {
      await apiClient.post('/user/logout', {});
    } catch (error) {
      console.warn('Error al hacer logout en el servidor:', error);
    } finally {
      apiClient.removeAccessToken();
      localStorage.removeItem('user');
    }
  },

  getProfile: async () => {
    return await apiClient.get<User>('/user/profile');
  },

  changePassword: async (data: ChangePasswordRequest) => {
    return await apiClient.post<ChangePasswordResponse>('/user/change-password', data);
  },
};
