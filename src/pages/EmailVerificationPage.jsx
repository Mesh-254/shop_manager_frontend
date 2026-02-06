"use client"

import EmailVerificationComponent from "../components/auth/EmailVerificationPage"

const EmailVerificationPage = () => {
  // You can get the email from URL params, localStorage, or props
  const email = new URLSearchParams(window.location.search).get("email") || "user@example.com"

  return <EmailVerificationComponent email={email} />
}

export default EmailVerificationPage
