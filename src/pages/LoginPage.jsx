"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import SocialButton from "../components/auth/SocialButton";
import { loginUser } from "../api/connection";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Centralized error state for the entire form submission
  const [submitError, setSubmitError] = useState({
    message: "",
    type: "", // e.g., 'inactive', 'user_not_found', 'invalid_credentials', 'server_error', 'network_error', 'general'
    showResendLink: false,
    showRegisterLink: false,
  });
  // Field-specific validation errors
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // useRef to manage the timeout ID for error messages, preventing re-renders from clearing it
  const errorTimeoutRef = useRef(null);

  // Pre-fill email from URL params if coming from other pages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setFormData((prev) => ({
        ...prev,
        email: decodeURIComponent(emailParam),
      }));
    }
  }, []);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  // Function to set a submit error with a timeout
  const setTimedSubmitError = (errorInfo, timeout = 20000) => {
    // Clear any existing timeout first
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    // Set the new submit error state
    setSubmitError(errorInfo);

    // Set a new timeout to clear the error
    errorTimeoutRef.current = setTimeout(() => {
      setSubmitError({
        message: "",
        type: "",
        showResendLink: false,
        showRegisterLink: false,
      });
      errorTimeoutRef.current = null; // Clear the ref after execution
    }, timeout);
  };

  // Function to dismiss the submit error immediately
  const dismissSubmitError = () => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
    setSubmitError({
      message: "",
      type: "",
      showResendLink: false,
      showRegisterLink: false,
    });
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear specific field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    // Dismiss general submit error if user starts typing in any field
    if (submitError.message) {
      dismissSubmitError();
    }
  };

  const validateForm = () => {
    const newFieldErrors = {};

    if (!formData.email) {
      newFieldErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFieldErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newFieldErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newFieldErrors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(newFieldErrors);
    return Object.keys(newFieldErrors).length === 0;
  };

  const detectBackendErrorType = (error) => {
    const errorData = error.response?.data || {};
    const status = error.response?.status;
    const detail = (errorData.detail || "").toLowerCase();
    const errorType = errorData.error_type || "";

    console.log("Login Error Analysis (Backend Response):", {
      status,
      detail,
      errorType,
      errorData,
    });

    // Backend: {'detail': 'Your account is not active yet...', 'error_type': 'inactive_account', 'email': email} (HTTP 400)
    if (
      errorType === "inactive_account" ||
      detail.includes("not active") ||
      detail.includes("inactive") ||
      detail.includes("verify") ||
      detail.includes("confirmation") ||
      detail.includes("activate") ||
      (errorData.non_field_errors &&
        errorData.non_field_errors.some(
          (err) =>
            err.toLowerCase().includes("not active") ||
            err.toLowerCase().includes("inactive") ||
            err.toLowerCase().includes("verify"),
        ))
    ) {
      return {
        message:
          "Your account is not active yet. Please check your email for the confirmation link to activate your account.",
        type: "inactive",
        showResendLink: true,
        showRegisterLink: false,
      };
    }

    // Backend: {'detail': 'Invalid email or password. Please try again. If you don\'t have an account, please register first.', 'error_type': 'user_not_found'} (HTTP 401)
    if (
      errorType === "user_not_found" ||
      status === 404 || // General 404 for user not found
      detail.includes("user not found") ||
      detail.includes("does not exist") ||
      (status === 401 && detail.includes("unable to log in")) // Generic 401 that might imply user not found
    ) {
      return {
        message: "Account doesn't exist. Please register for a new account.",
        type: "user_not_found",
        showResendLink: false,
        showRegisterLink: true,
      };
    }

    // Backend: {'detail': 'Invalid email or password. Please try again.', 'error_type': 'invalid_credentials'} (HTTP 401)
    if (
      errorType === "invalid_credentials" ||
      detail.includes("invalid credentials") ||
      detail.includes("incorrect password") ||
      detail.includes("authentication failed") ||
      (status === 401 && !detail.includes("not found")) // Catch all 401s not related to user_not_found
    ) {
      return {
        message: "Invalid email or password. Please try again.",
        type: "invalid_credentials",
        showResendLink: false,
        showRegisterLink: false,
      };
    }

    // Backend: {'detail': 'Email and password are required.', 'error_type': 'missing_credentials'} (HTTP 400)
    if (
      errorType === "missing_credentials" ||
      detail.includes("email and password are required")
    ) {
      return {
        message: "Email and password are required.",
        type: "validation_error",
        showResendLink: false,
        showRegisterLink: false,
      };
    }

    // Backend: {'detail': 'Login failed. Please try again.', 'error_type': 'server_error'} (HTTP 500)
    if (status >= 500) {
      return {
        message:
          "Server error. Please try again later or contact support if the problem persists.",
        type: "server_error",
        showResendLink: false,
        showRegisterLink: false,
      };
    }

    // Network errors (no response from server)
    if (!error.response) {
      return {
        message:
          "Network error. Please check your internet connection and try again.",
        type: "network_error",
        showResendLink: false,
        showRegisterLink: false,
      };
    }

    // Default fallback for any other unhandled errors
    return {
      message:
        errorData.detail ||
        "Login failed. Please check your information and try again.",
      type: "general",
      showResendLink: false,
      showRegisterLink: false,
    };
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSubmitError({ message: "", type: "", showResendLink: false, showRegisterLink: false });

  try {
    const { user } = await loginUser(formData.email, formData.password, rememberMe);

    // Successful login → redirect based on role
    const role = user?.role;

    if (role === "SuperAdmin" || role === "ShopAdmin") {
      window.location.href = "/admin/dashboard"; // or use react-router navigate
    } else if (role === "Cashier") {
      window.location.href = "/cashier/pos";
    } else {
      throw new Error("Unknown user role");
    }
  } catch (err) {
    console.error("Login failed:", err);

    let message = err.message || "An error occurred during login";
    let type = "general";
    let showResend = false;
    let showRegister = false;

    if (err.type === "inactive") {
      type = "inactive";
      showResend = true;
      message = err.detail || "Please verify your email first.";
    } else if (message.includes("Invalid credentials")) {
      type = "invalid_credentials";
    }

    setSubmitError({ message, type, showResendLink: showResend, showRegisterLink: showRegister });
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Google login initiated");
      // Handle Google login redirect
    } catch (error) {
      setTimedSubmitError({
        message: "Google login failed. Please try again.",
        type: "google_error",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back to SHOP Manager"
      subtitle="Access Your Store Dashboard – Let's Get You Signed In!"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {submitError.message && (
          <div
            // Key ensures React re-renders this component when the error message changes,
            // helping to reset animations and prevent flickering.
            key={submitError.message + submitError.type}
            className={`border-2 rounded-2xl p-6 relative animate-fade-in shadow-lg ${
              submitError.type === "inactive"
                ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300"
                : submitError.type === "user_not_found"
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300"
                  : submitError.type === "server_error" ||
                      submitError.type === "network_error"
                    ? "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-300"
                    : "bg-gradient-to-r from-red-50 to-red-100 border-red-300"
            }`}
            role="alert" // ARIA role for accessibility
          >
            <button
              type="button"
              className={`absolute top-4 right-4 p-1 rounded-full hover:bg-white/50 transition-all duration-200 ${
                submitError.type === "inactive"
                  ? "text-orange-600 hover:text-orange-800"
                  : submitError.type === "user_not_found"
                    ? "text-blue-600 hover:text-blue-800"
                    : submitError.type === "server_error" ||
                        submitError.type === "network_error"
                      ? "text-purple-600 hover:text-purple-800"
                      : "text-red-600 hover:text-red-800"
              }`}
              onClick={dismissSubmitError}
              aria-label="Dismiss error message"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-start pr-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                  submitError.type === "inactive"
                    ? "bg-orange-200"
                    : submitError.type === "user_not_found"
                      ? "bg-blue-200"
                      : submitError.type === "server_error" ||
                          submitError.type === "network_error"
                        ? "bg-purple-200"
                        : "bg-red-200"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    submitError.type === "inactive"
                      ? "text-orange-600"
                      : submitError.type === "user_not_found"
                        ? "text-blue-600"
                        : submitError.type === "server_error" ||
                            submitError.type === "network_error"
                          ? "text-purple-600"
                          : "text-red-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {submitError.type === "inactive" ? (
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  ) : submitError.type === "user_not_found" ? (
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
              </div>

              <div className="flex-1">
                <div
                  className={`font-bold text-xl mb-3 ${
                    submitError.type === "inactive"
                      ? "text-orange-800"
                      : submitError.type === "user_not_found"
                        ? "text-blue-800"
                        : submitError.type === "server_error" ||
                            submitError.type === "network_error"
                          ? "text-purple-800"
                          : "text-red-800"
                  }`}
                >
                  {submitError.type === "inactive"
                    ? "🔒 Account Not Active"
                    : submitError.type === "user_not_found"
                      ? "👤 Account Not Found"
                      : submitError.type === "server_error" ||
                          submitError.type === "network_error"
                        ? "⚠️ System Error"
                        : "❌ Login Failed"}
                </div>

                <p
                  className={`text-lg font-medium leading-relaxed mb-5 ${
                    submitError.type === "inactive"
                      ? "text-orange-700"
                      : submitError.type === "user_not_found"
                        ? "text-blue-700"
                        : submitError.type === "server_error" ||
                            submitError.type === "network_error"
                          ? "text-purple-700"
                          : "text-red-700"
                  }`}
                >
                  {submitError.message}
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {submitError.showResendLink && (
                    <Link
                      to={`/verify-email?email=${encodeURIComponent(formData.email)}`}
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Resend Confirmation Email
                    </Link>
                  )}

                  {submitError.showRegisterLink && (
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Create New Account
                    </Link>
                  )}
                </div>

                {/* Additional Help Text */}
                {submitError.type === "inactive" && (
                  <div className="mt-5 pt-4 border-t border-orange-200 bg-orange-50/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-orange-800 mb-1">
                          💡 Quick Tips:
                        </p>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li>
                            • Check your spam/junk folder for the confirmation
                            email
                          </li>
                          <li>
                            • The email might take a few minutes to arrive
                          </li>
                          <li>
                            • Make sure to click the activation link in the
                            email
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {submitError.type === "user_not_found" && (
                  <div className="mt-5 pt-4 border-t border-blue-200 bg-blue-50/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-blue-800 mb-1">
                          💡 What to do:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Double-check your email address for typos</li>
                          <li>
                            • Create a new account if you're new to SHOP Manager
                          </li>
                          <li>
                            • Contact support if you believe this is an error
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <InputField
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange("email")}
          error={fieldErrors.email}
          required
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          }
        />

        <InputField
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange("password")}
          error={fieldErrors.password}
          required
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 text-teal-600 bg-gray-100 border-2 border-gray-300 rounded focus:ring-teal-500 focus:ring-2 transition-all duration-200"
            />
            <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900 transition-colors">
              Remember me
            </span>
          </label>

          <Link
            to="/forgot-password"
            className="text-base text-orange-600 hover:text-orange-700 font-semibold transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-base">
            <span className="px-6 bg-white text-gray-600 font-medium">
              Or continue with
            </span>
          </div>
        </div>

        <SocialButton
          provider="google"
          onClick={handleGoogleLogin}
          loading={googleLoading}
          disabled={isLoading}
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          }
        />

        <div className="text-center pt-8">
          <p className="text-gray-600 text-lg">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 hover:text-orange-700 font-bold transition-colors hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 SHOP Manager. All rights reserved. |{" "}
          <Link to="/terms" className="hover:text-gray-700 transition-colors">
            Terms of Service
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
