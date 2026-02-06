"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CenteredAuthLayout from "./CenteredAuthLayout"

const EmailVerificationPage = ({ email = "user@example.com" }) => {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setResendSuccess(true)
      setCountdown(60)
      setCanResend(false)

      // Hide success message after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000)
    } catch (error) {
      console.error("Failed to resend email:", error)
    } finally {
      setIsResending(false)
    }
  }

  const handleChangeEmail = () => {
    // Navigate back to registration or show email change form
    window.history.back()
  }

  return (
    <CenteredAuthLayout title="Check Your Email" subtitle="We've sent a verification link to your inbox">
      <div className="text-center space-y-8">
        {/* Email Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Verification Email Sent!</h2>
          <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
            <p className="text-lg text-gray-700 leading-relaxed">We've sent a verification link to:</p>
            <p className="text-xl font-bold text-teal-700 mt-2 break-all">{email}</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 text-left">
          <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Next Steps:
          </h3>
          <ol className="space-y-3 text-base text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                1
              </span>
              <span>Check your email inbox (and spam folder)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                2
              </span>
              <span>Click the "Verify Account" button in the email</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                3
              </span>
              <span>You'll be redirected to your SHOP Manager dashboard</span>
            </li>
          </ol>
        </div>

        {/* Success Message */}
        {resendSuccess && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 animate-fade-in">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-700 font-semibold text-lg">Verification email sent successfully!</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Resend Email Button */}
          <button
            onClick={handleResendEmail}
            disabled={!canResend || isResending}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
              canResend && !isResending
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isResending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : canResend ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Resend Verification Email</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Resend in {countdown}s</span>
              </>
            )}
          </button>

          {/* Change Email Button */}
          <button
            onClick={handleChangeEmail}
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            Change Email Address
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Didn't receive the email?</h3>
          <div className="text-base text-gray-600 space-y-2">
            <p>• Check your spam or junk folder</p>
            <p>• Make sure {email} is correct</p>
            <p>• Wait a few minutes for the email to arrive</p>
            <p>• Contact our support team if you need help</p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link to="/support" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center pt-6">
          <p className="text-gray-600 text-lg">
            Remember your password?{" "}
            <Link to="/login" className="text-teal-600 hover:text-teal-700 font-bold transition-colors hover:underline">
              Back to Sign In
            </Link>
          </p>
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
  )
}

export default EmailVerificationPage
