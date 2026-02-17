import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../api/connection"; // adjust path

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await requestPasswordReset(email.trim().toLowerCase());
      setMessage(
        "If an account exists, a reset link has been sent to your email.",
      );
    } catch (err) {
      setError(err.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
          <p className="mt-2 text-center text-gray-600">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email address"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <p className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
