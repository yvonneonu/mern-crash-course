import { create } from "zustand";
import { useAuthStore } from "./authStore";
const URL = import.meta.env.VITE_FRONTEND_URL;
export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    const { token } = useAuthStore.getState().user?.token; // get the authentication state
    if (!token) {
      return { success: false, message: "Please login to create a product." };
    }
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch(`${URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include the token in the headers
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch(`${URL}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const { token } = useAuthStore.getState().user?.token; // get the authentication state
    if (!token) {
      return { success: false, message: "Please login to delete a product." };
    }

    const res = await fetch(`${URL}/api/products/${pid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // include the token in the headers
      },
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    const { token } = useAuthStore.getState().user?.token; // get the authentication state
    if (!token) {
      return { success: false, message: "Please login to update a product." };
    }
    const res = await fetch(`${URL}/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // include the token in the headers
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
