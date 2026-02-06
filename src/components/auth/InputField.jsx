"use client"

import { useState } from "react"

const InputField = ({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  required = false,
  error = "",
  icon = null,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className="mb-8">
      {label && (
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">{icon}</div>}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${icon ? "pl-14" : "pl-5"} pr-14 py-5 bg-white border-2 rounded-2xl text-gray-900 text-lg placeholder-gray-500 transition-all duration-300 focus:outline-none shadow-sm hover:shadow-md ${
            error
              ? "border-red-400 focus:border-red-500 bg-red-50"
              : isFocused
                ? "border-teal-500 focus:border-teal-600 bg-teal-50/30 shadow-lg"
                : "border-gray-200 hover:border-gray-300"
          }`}
          style={{
            fontSize: "18px",
            lineHeight: "1.5",
          }}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            {showPassword ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-base font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}

export default InputField
