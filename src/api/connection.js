import axios from "axios";

// Base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:8000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout to prevent hanging requests
});

// Helper to get tokens (supports both localStorage and sessionStorage)
const getAccessToken = () =>
  localStorage.getItem("access_token") ||
  sessionStorage.getItem("access_token");

const getRefreshToken = () =>
  localStorage.getItem("refresh_token") ||
  sessionStorage.getItem("refresh_token");

const setTokens = (access, refresh, remember = false) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("access_token", access);
  storage.setItem("refresh_token", refresh);
};

const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
};

// Request interceptor – attach token to protected requests only
api.interceptors.request.use(
  (config) => {
    // List of public endpoints that should NOT receive Authorization header
    const publicEndpoints = [
      "/api/accounts/register/",
      "/api/token/", // or /api/accounts/login/ depending on your backend
      "/api/accounts/login/",
      "/api/accounts/check-email/",
      "/api/accounts/resend-confirmation/",
      "/api/accounts/password-reset/",
      "/api/accounts/password-reset-confirm/",
      "/api/accounts/verify-email/",
    ];

    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    const token = getAccessToken();
    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor – handle 401 → token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once, and only on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/token/refresh/`, // adjust path if different
          { refresh: refreshToken },
        );

        const { access } = refreshResponse.data;

        // Update stored access token
        if (localStorage.getItem("access_token")) {
          localStorage.setItem("access_token", access);
        } else {
          sessionStorage.setItem("access_token", access);
        }

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Refresh failed → logout user
        clearTokens();
        window.location.href = "/login?session_expired=true";
        return Promise.reject(refreshError);
      }
    }

    // Pass other errors through
    return Promise.reject(error);
  },
);

// ────────────────────────────────────────────────
// Auth functions
// ────────────────────────────────────────────────

/**
 * Login user and store tokens
 * @param {string} email
 * @param {string} password
 * @param {boolean} rememberMe - whether to use localStorage (persistent) or sessionStorage
 * @returns {Promise<{user: any, access: string, refresh: string}>}
 */
export const loginUser = async (email, password, rememberMe = false) => {
  try {
    const response = await api.post("/api/accounts/login/", {
      email: email.trim().toLowerCase(),
      password,
    });

    const { access, refresh, user } = response.data;

    setTokens(access, refresh, rememberMe);

    return { user, access, refresh };
  } catch (error) {
    if (error.response) {
      // Server responded with error (400, 401, 403, etc.)
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error(data.detail || "Invalid credentials");
      }
      if (status === 403) {
        throw new Error(data.detail || "Account is inactive or not verified");
      }
      if (status === 400) {
        throw new Error(data.detail || data.email?.[0] || "Invalid input");
      }
    }
    throw new Error(error.message || "Network error or server unreachable");
  }
};

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/accounts/register/", {
      email: userData.email.trim().toLowerCase(),
      full_name: userData.full_name.trim(),
      password: userData.password,
      phone_number: userData.phone_number?.trim() || "",
      // role: ... (if you allow frontend to send role – usually better to default backend)
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Registration failed" };
  }
};

export const confirmPasswordReset = async (token, password) => {
  try {
    const response = await api.post(
      `/api/accounts/password-reset-confirm/${token}/`,
      { password }, // Backend expects "password", not "new_password"
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Password reset failed" };
  }
};

/**
 * Logout – clear tokens and redirect
 */
export const logout = (redirect = true) => {
  clearTokens();
  if (redirect) {
    window.location.href = "/login";
  }
};

/**
 * Check if user is authenticated (quick sync check)
 */
export const isAuthenticated = () => !!getAccessToken();

/**
 * Get current access token (for manual use if needed)
 */
export const getCurrentAccessToken = getAccessToken;

// ────────────────────────────────────────────────
// Other endpoints (unchanged or lightly improved)
// ────────────────────────────────────────────────

export const googleLogin = async (googleToken) => {
  return api.post("/api/accounts/google-login/", { token: googleToken });
};

export const verifyEmail = async (token) => {
  return api.get(`/api/accounts/verify-email/${token}/`);
};

export const checkEmailExists = async (email) => {
  return api.post("/api/accounts/check-email/", {
    email: email.trim().toLowerCase(),
  });
};

export const resendConfirmationEmail = async (email) => {
  return api.post("/api/accounts/resend-confirmation/", {
    email: email.trim().toLowerCase(),
  });
};

export const requestPasswordReset = async (email) => {
  return api.post("/api/accounts/password-reset/", {
    email: email.trim().toLowerCase(),
  });
};

export const getUserProfile = async () => {
  return api.get("/api/accounts/profile/");
};

export const updateUserProfile = async (userData) => {
  return api.patch("/api/accounts/profile/", userData);
};

export default api;
