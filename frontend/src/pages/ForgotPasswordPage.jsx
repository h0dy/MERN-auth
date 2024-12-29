import React, { useState } from "react";
import { Mail, ArrowLeft, Loader } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="form-container"
    >
      <div className="p-8">
        <h2 className="heading">Forgot Password</h2>
        {isSubmitted ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              we sent a reset link for {email}, make sure to check your email
              box, or your spam box for the link
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-center text-sm text-gray-300 mb-6">
              Enter your email and we'll send you a link to reset your password
            </p>
            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                "Send Rest Link"
              )}
            </motion.button>
          </form>
        )}
      </div>
      <div className="bottom-form-container">
        <ArrowLeft className="text-violet-500 size-4" />
        <p className="text-sm text-gray-400">Back to</p>
        <Link to={"/login"} className="text-violet-500 text-sm hover:underline">
          Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
