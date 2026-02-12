// pages/VerifyEmailPage.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/accounts/verify-email/${token}/`, // Fixed: Added /api/
        );

        setStatus("success");
        setMessage(
          response.data.message ||
            response.data.detail ||
            "Account activated successfully!",
        );

        // Countdown to redirect to success page (which then goes to dashboard)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate("/verification-success"); // Chain to success page
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        setStatus("error");
        const errorMsg =
          error.response?.data?.error ||
          error.response?.data?.detail ||
          "Verification failed. The link may be invalid or expired.";
        setMessage(errorMsg);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
        {/* Header / Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Verifying Your Email
          </h1>
        </div>

        {/* Status Message */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            {status === "verifying" &&
              "Please wait while we confirm your account."}
            {status === "success" && (
              <>
                {message}
                <br />
                <br />
                Redirecting in{" "}
                <span className="font-bold text-orange-600">
                  {countdown}
                </span>{" "}
                seconds...
              </>
            )}
            {status === "error" && message}
          </p>

          {/* Actions */}
          <div className="space-y-4 mt-8">
            {status === "success" && (
              <button
                onClick={() => navigate("/verification-success")}
                className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Continue Now
              </button>
            )}

            {status === "error" && (
              <>
                <button
                  onClick={() => navigate("/verify-email")} // Go to resend page
                  className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Resend Verification Email
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-4 px-6 rounded-2xl font-medium text-base bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 shadow-md"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 SHOP Manager. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
