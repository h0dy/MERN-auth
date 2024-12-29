import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Lock, Mail, User, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import PasswordStrength from "../components/PasswordChecker";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isLoading: false,
  });
  const handleFormData = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    return setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="form-container"
    >
      <div className="p-8">
        <h2 className="form-heading">Create Account</h2>
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

          <PasswordStrength password={formData.password} />

          <motion.button
            className="btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={formData.isLoading}
            style={{ cursor: formData.isLoading && "not-allowed" }}
          >
            {formData.isLoading ? (
              <Loader className="size-5 animate-spin mx-auto" />
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
