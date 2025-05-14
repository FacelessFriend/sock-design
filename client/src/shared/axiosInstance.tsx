import axios, { type AxiosInstance } from 'axios';

const $api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let accessToken = localStorage.getItem('accessToken') || '';

export function setAccessToken(token: string) {
  accessToken = token;
  localStorage.setItem('accessToken', token); 
}

export function clearAccessToken() {
  accessToken = '';
  localStorage.removeItem('accessToken');
}

$api.interceptors.request.use((config) => {
  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevReq = error.config;
    
    
    if (error.response?.status === 403 && !prevReq._retry) {
      prevReq._retry = true; 
      
      try {
        const response = await $api.post('/refresh');
        if (response.status === 200) {
          setAccessToken(response.data.accessToken);
          prevReq.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return $api(prevReq);
        }
      } catch (refreshError) {
        clearAccessToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
