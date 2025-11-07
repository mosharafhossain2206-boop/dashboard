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
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 🟡 Guard: only retry once
//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // 🔁 Hit refresh token endpoint
//         const res = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/${
//             import.meta.env.VITE_BASE_API
//           }/auth/refreshToken`,
//           { withCredentials: true }
//         );

//         const accessToken = res.data?.data?.accessToken;

//         if (accessToken) {
//           console.log("accessToken from axios interceptor", accessToken);
//           // ✅ Store new token
//           localStorage.setItem("acceesToken", JSON.stringify(accessToken));

//           // ✅ Update both default and current headers
//           api.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${accessToken}`;
//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//           // 🔁 Retry the failed request
//           return api(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("🔴 Refresh token failed:", refreshError);
//         localStorage.removeItem("acceesToken");
//         // window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export { api };
