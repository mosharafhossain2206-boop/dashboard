import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/${
    import.meta.env.VITE_BASE_API
  }`,
  withCredentials: true,
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("acceesToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Promise.reject(error)", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (Handles 401 + token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔁 Hit refresh token endpoint
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/${
            import.meta.env.VITE_BASE_API
          }/auth/refreshToken`,
          {},
          { withCredentials: true }
        );

        const token = res.data.data.accesToken;
        if (!token) {
          throw new Error("token not found");
        }
        localStorage.setItem("acceesToken", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("🔴 Refresh token failed:", refreshError);
        localStorage.removeItem("acceesToken");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
