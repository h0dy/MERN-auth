import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const { resetPassword, error, isLoading, message } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { icon: "❌" });
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success(
        "Passwords reset successfully, redirecting to login page...",
        { icon: "✔️" }
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="form-container"
    >
      <div className="p-8">
        <h2 className="heading">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="err">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
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
              "Reset Password"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
