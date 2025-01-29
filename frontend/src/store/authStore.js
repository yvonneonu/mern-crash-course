import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  register: async (userData) => {
    const res = await fetch("/api/auth/register", {
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

  login: async (userData) => {
    const res = await fetch("/api/auth/login", {
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

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  checkAuth: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
}));
