import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date.js";
const HomePage = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <motion.div
      className="dash-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="heading">Dashboard</h2>
      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-violet-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-violet-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="btn"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
