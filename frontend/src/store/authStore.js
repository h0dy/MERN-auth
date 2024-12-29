import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true; // to put the cookie in the header

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const email = data.email;
      const name = data.name;
      const password = data.password;
      const res = await axios.post(`${API_URL}/signup`, {
        email,
        name,
        password,
      });
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
}));
