

// Create a base Axios instance
const api = axios.create({
  baseURL: "https://api.example.com", // Base URL for all requests
  withCredentials: true, // Include cookies if needed
});

// ===============================
// 1. Request Interceptor
// ===============================
// Goal: Attach the access token to every outgoing request automatically.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Retrieve access token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config; // Proceed with the request
  },
  (error) => Promise.reject(error) // Propagate any request errors to calling code
);

// ===============================
// 2. Response Interceptor
// ===============================
// Goal: Handle expired access tokens by using a refresh token to get a new one and retry the failed request.
api.interceptors.response.use(
  (response) => response, // If response is successful, return it as-is
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to expired token (401) and we haven't retried this request yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried
      try {
        // Request a new access token using the refresh token
        const res = await axios.post(
          "https://api.example.com/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken); // Save the new access token

        // Update default Authorization header for future requests
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    // For all other errors, propagate them to the calling code
    return Promise.reject(error);
  }
);

export default api;
