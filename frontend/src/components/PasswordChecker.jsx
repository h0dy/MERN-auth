import { Check, X } from "lucide-react";
import React from "react";
const PasswordChecker = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", check: password.length >= 6 },
    { label: "Contains uppercase letter", check: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", check: /[a-z]/.test(password) },
    { label: "Contains a number", check: /\d/.test(password) },
    {
      label: "Contains special character",
      check: /[^A-Za-z0-9]/.test(password),
    },
  ];
  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div className="flex items-center text-xs" key={item.label}>
          {item.check ? (
            <Check className="size-4 text-green-600 mr-2" />
          ) : (
            <X className="size-4 text-red-600 mr-2" />
          )}
          <span className={item.check ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const passwordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = passwordStrength(password);

  const getColor = (strength) => {
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-300";
    return "bg-green-500";
  };
  const strengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "strong";
  };
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{strengthText(strength)}</span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className={`h-1 w-1/4 rounded-full transition duration-700 ${
              idx < strength ? getColor(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <PasswordChecker password={password} />
    </div>
  );
};

export default PasswordStrength;
