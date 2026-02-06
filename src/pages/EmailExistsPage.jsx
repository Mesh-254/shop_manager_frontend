"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CenteredAuthLayout from "../components/auth/CenteredAuthLayout"
import { resendConfirmationEmail } from "../api/connection" // Import the actual API call

const EmailExistsPage = () => {
  const [email, setEmail] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState("") // State for resend errors

  useEffect(() => {
    // Get email from URL params
    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [])

  const handleResendConfirmation = async () => {
    if (!email) {
      setResendError("Email address is required to resend confirmation.")
      return
    }

    setIsResending(true)
    setResendSuccess(false)
    setResendError("") // Clear previous errors

    try {
      await resendConfirmationEmail(email) // Use actual API call
      setResendSuccess(true)
      // Hide success message after 8 seconds
      setTimeout(() => setResendSuccess(false), 8000)
    } catch (error) {
      console.error("Failed to resend confirmation email:", error.response?.data)
      const errorData = error.response?.data || {}
      if (errorData.error_type === "already_active") {
        setResendError("This account is already active. You can sign in normally.")
      } else if (errorData.error_type === "user_not_found") {
        setResendError("No account found with this email address.")
      } else {
        setResendError(errorData.detail || "Failed to resend confirmation email. Please try again.")
      }
      // Keep error message visible for longer
      setTimeout(() => setResendError(""), 15000)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <CenteredAuthLayout
      title="Email Already Registered"
      subtitle="This email address is already associated with a SHOP Manager account"
    >
      <div className="text-center space-y-8">
        {/* Info Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Account Found!</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The email address <strong className="text-blue-700 break-all">{email || "you entered"}</strong> is already
              registered with SHOP Manager.
            </p>
            <p className="text-base text-gray-600">
              You can sign in to your existing account below. If you haven't activated your account yet, you can request
              a new confirmation email.
            </p>
          </div>
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
              <p className="text-green-700 font-semibold text-lg">Confirmation email sent successfully!</p>
            </div>
            <p className="text-green-600 text-sm mt-2">Please check your inbox and spam folder.</p>
          </div>
        )}

        {/* Error Message for Resend */}
        {resendError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 animate-fade-in">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 font-semibold text-base">{resendError}</p>
            </div>
          </div>
        )}

        {/* Action Options */}
        <div className="space-y-4">
          {/* Sign In Button */}
          <Link
            to={`/login${email ? `?email=${encodeURIComponent(email)}` : ""}`}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <span>Sign In to Your Account</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Resend Confirmation Button */}
          <button
            onClick={handleResendConfirmation}
            disabled={isResending || !email}
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
          >
            {isResending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Resend Confirmation Email</span>
              </>
            )}
          </button>

          {/* Forgot Password Link */}
          <Link
            to={`/forgot-password?email=${encodeURIComponent(email)}`}
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-105 block text-center"
          >
            Forgot Your Password?
          </Link>

          {/* Try Different Email Button */}
          <Link
            to="/register"
            className="w-full py-3 px-6 rounded-2xl font-medium text-base bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 hover:scale-105 block text-center"
          >
            Try a Different Email Address
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Need Help?
          </h3>
          <div className="text-base text-gray-600 space-y-2 text-left">
            <p>• If you forgot your password, use the "Forgot Your Password?" button above</p>
            <p>• If you can't access your email, contact our support team</p>
            <p>• Check your spam/junk folder for confirmation emails</p>
            <p>• If you believe this is an error, please reach out to us</p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-500">
              Still need assistance?{" "}
              <Link to="/support" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
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

export default EmailExistsPage
