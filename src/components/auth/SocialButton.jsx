"use client"

const SocialButton = ({ provider, onClick, icon, disabled = false, loading = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center space-x-4 py-5 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95 hover:shadow-lg"
      } bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md`}
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      ) : (
        icon
      )}
      <span>Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
    </button>
  )
}

export default SocialButton
