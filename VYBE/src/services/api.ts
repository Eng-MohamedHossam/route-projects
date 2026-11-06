import axios from "axios";

const api = axios.create({
  baseURL: "https://route-posts.routemisr.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isPasswordChangeRequest = error.config?.url?.includes(
      "/users/change-password",
    );

    if (error.response?.status === 401 && !isPasswordChangeRequest) {
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export default api;
