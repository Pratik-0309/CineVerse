import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const isRefreshCall = originalRequest?.url?.includes(
      "/api/user/refresh-token",
    );

    const isAuthRoute =
  originalRequest?.url?.includes("/api/user/refresh-token") ||
  originalRequest?.url?.includes("/api/user/logout");

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall &&!isAuthRoute
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          "http://localhost:8080/api/user/refresh-token",
          {},
          { withCredentials: true },
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
