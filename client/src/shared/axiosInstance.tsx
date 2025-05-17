import axios from "axios";

const $api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let accessToken = localStorage.getItem("accessToken") || "";

export function setAccessToken(token: string) {
  accessToken = token;
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  accessToken = "";
  localStorage.removeItem("accessToken");
}

$api.interceptors.request.use((config) => {
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get("http://localhost:3000/api/refresh", {
          withCredentials: true,
        });

        if (response.data.accessToken) {
          setAccessToken(response.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return $api(originalRequest);
        }
      } catch (refreshError) {
        clearAccessToken();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
