import $api from '../../../shared/axiosInstance';
import type { AuthResponse } from './types';

export async function register(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
  try {
    const response = await $api.post<AuthResponse>('/registration', data);
    return response.data;
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
}

export async function login(data: { email: string; password: string }): Promise<AuthResponse> {
  try {
    const response = await $api.post<AuthResponse>('/login', data);
    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
}

export async function logout(): Promise<{ message: string }> {
  try {
    const response = await $api.post<{ message: string }>('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error', error);
    throw error;
  }
}

export const authApi = {
    login,
    register,
    logout,
};