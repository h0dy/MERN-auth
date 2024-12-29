import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, Mail, User, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordChecker";
import { useAuthStore } from "../store/authStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleFormData = (e) => {
    const { value, name } = e.target;
    return setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
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
        <h2 className="heading">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleFormData}
          />
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
          {error && <p className="err">{error}</p>}
          <PasswordStrength password={formData.password} />

          <motion.button
            className="btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            style={{ cursor: isLoading && "not-allowed" }}
          >
            {isLoading ? (
              <Loader className="size-5 animate-spin mx-auto" size={24} />
            ) : (
              "Sign up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="bottom-form-container">
        <p className="text-sm text-gray-400">Already have an account? </p>
        <Link to={"/login"} className="text-violet-500 hover:underline">
          Log in
        </Link>
      </div>
    </motion.div>
  );
};
export default SignupPage;
