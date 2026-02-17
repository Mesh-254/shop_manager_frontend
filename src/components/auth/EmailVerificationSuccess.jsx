"use client";
import { Link, useNavigate } from "react-router-dom";
import CenteredAuthLayout from "./CenteredAuthLayout";
import { useState, useEffect } from "react";



const EmailVerificationSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate(); // Recommended over window.location for SPA routing

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Recommended: redirect to login first (since verification does NOT auto-login the user)
      navigate("/login?verified=true"); // Add query param so login page can show "Email verified!" message
    }
  }, [countdown, navigate]);

  return (
    <CenteredAuthLayout
      title="Account Verified!"
      subtitle="Welcome to SHOP Manager – Your account is now active"
    >
      <div className="text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            🎉 Verification Complete!
          </h2>
          <p className="text-lg text-green-700 leading-relaxed">
            Your email has been successfully verified. Your SHOP Manager account
            is now fully activated and ready to use.
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 text-left">
          <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            What's Next:
          </h3>
          <ul className="space-y-3 text-base text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-200 text-teal-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                ✓
              </span>
              <span>Set up your first shop location</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-200 text-teal-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                ✓
              </span>
              <span>Add your products and inventory</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-200 text-teal-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                ✓
              </span>
              <span>Start processing sales and managing your store</span>
            </li>
          </ul>
        </div>

        {/* Auto-redirect Notice */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5">
          <div className="flex items-center justify-center">
            <svg
              className="w-5 h-5 text-orange-600 mr-2 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <p className="text-orange-700 font-semibold">
              Redirecting to your dashboard in {countdown} seconds...
            </p>
          </div>
        </div>

        {/* Manual Navigation */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <span>Go to Dashboard</span>
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
          </Link>

          <Link
            to="/"
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-105 block text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 SHOP Manager. All rights reserved. |{" "}
            <Link to="/terms" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </CenteredAuthLayout>
  );
};

export default EmailVerificationSuccess;
