//store/authStore.js
import { create } from "zustand";
const URL = import.meta.env.VITE_FRONTEND_URL || "";

export const useAuthStore = create((set) => ({
  user: { checkAuth: false },

  // Initiate Google login
  googleLogin: () => {
    window.location.href = `${URL}/api/auth/google`;
  },
  instagramLogin: () => {
    window.location.href = `${URL}/api/auth/instagram`;
  },

  register: async (userData) => {
    const res = await fetch(`${URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    localStorage.setItem("user", JSON.stringify(data.data));
    set({ user: data.data });
    return { success: true, message: data.message };
  },

  login: async (email, password) => {
    const res = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    localStorage.setItem("user", JSON.stringify(data.data));
    set({ user: { ...data.data, checkAuth: true } });
    return { success: true, message: data.message, data: data.data };
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  checkAuth: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: { ...JSON.parse(user), checkAuth: true } });
    }
  },
}));
