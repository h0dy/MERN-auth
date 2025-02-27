import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, Mail, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading, error } = useAuthStore();

  const handleFormData = (e) => {
    const { value, name } = e.target;
    return setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="form-container"
    >
      <div className="p-8">
        <h2 className="heading">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormData}
          />
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormData}
          />
          <div className="flex items-center mb-2">
            <Link
              to={"/forgot-password"}
              className="text-violet-500 hover:underline"
            >
              Forgot Password
            </Link>
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
              "Log in"
            )}
          </motion.button>
        </form>
      </div>
      <div className="bottom-form-container">
        <p className="text-sm text-gray-400">Don't have an account? </p>
        <Link to={"/signup"} className="text-violet-500 hover:underline">
          Sign up
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginPage;
