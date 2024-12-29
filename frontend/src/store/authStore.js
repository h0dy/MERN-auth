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

  signup: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/signup`, { ...credentials });
      set({ isAuthenticated: true, user: res.data.user, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/login`, { ...credentials });
      set({
        isAuthenticated: true,
        user: res.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "error login ",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "error login out ",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (verificationToken) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/verify-email`, {
        verificationToken,
      });
      set({ isAuthenticated: true, user: res.data.user, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/authenticated`);
      set({
        isAuthenticated: true,
        user: res.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        error: null,
        isCheckingAuth: false,
      });
      throw error;
    }
  },
}));
