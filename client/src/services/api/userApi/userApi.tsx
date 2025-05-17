import $api from '../../../shared/axiosInstance';

interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const register = async (data: { name: string; email: string; password: string }): Promise<AuthResponse> => {
  const response = await $api.post('/registration', data);
  return response.data;
};

export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await $api.post('/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await $api.post('/logout');
};

export const refresh = async (): Promise<AuthResponse> => {
  const response = await $api.get('/refresh');
  return response.data;
};

export default {
  register,
  login,
  logout,
  refresh,
};