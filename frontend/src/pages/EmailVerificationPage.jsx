import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (idx, value) => {
    const newCode = [...code];

    // Handle pasted code
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIdx = newCode.findLastIndex((num) => num !== "");
      const focusIndex = lastFilledIdx < 5 ? lastFilledIdx + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[idx] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && idx < 5) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (idx, event) => {
    if (event.key === "Backspace" && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationToken = code.join("");
    try {
      await verifyEmail(verificationToken);
      navigate("/");
      toast.success("Email verified successfully", {
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);
  return (
    <div className="verification-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="verification-sub-container"
      >
        <h2 className="form-heading">Verify Your Email</h2>
        <p className="text-center text-sm text-gray-300 mb-6">
          Enter the 6 digit code sent to your email
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((num, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength="6"
                value={num}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="verify-code-box"
              />
            ))}
          </div>
          {error && <p className="err">{error}</p>}
          <motion.button
            className="btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            style={{ cursor: isLoading && "not-allowed" }}
          >
            {isLoading ? (
              <Loader className="size-5 animate-spin mx-auto" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
