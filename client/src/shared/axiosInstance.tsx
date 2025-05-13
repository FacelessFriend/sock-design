import axios from 'axios';

const $api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

$api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
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
    const status = error.response.status;
    if (status === 403 && !prevReq.send) {
      const response = await $api('/tokens/refresh');
      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        prevReq.send = true;
        prevReq.headers.Authorization = `Bearer ${accessToken}`;
        return $api(prevReq);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
