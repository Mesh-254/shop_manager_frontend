"use client";

const PasswordStrength = ({ password }) => {
  const getStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score, label: "Fair", color: "bg-yellow-500" };
    if (score <= 4) return { score, label: "Good", color: "bg-blue-500" };
    return { score, label: "Strong", color: "bg-green-500" };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Password Strength
        </span>
        <span
          className={`text-sm font-semibold ${strength.color.replace(
            "bg-",
            "text-"
          )}`}
        >
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;
