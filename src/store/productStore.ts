/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRoute, ICategory, IProduct, IRequest } from "@/utils";
import { create } from "zustand";

interface ProductStore {
  products: IRequest<IProduct> | null;
  categories: IRequest<ICategory> | null;
  loading: boolean;
  error: string | null;
  message: string;
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  fetchCategories: (page?: number, limit?: number) => Promise<void>;
  createCategory: (data?: any) => Promise<void>;
  updateCategory: (data?: any) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  createProduct: (data?: any) => Promise<void>;
  updateProduct: (data?: any) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: null,
  categories: null,
  loading: false,
  message: "",
  error: null,

  fetchCategories: async (page?: number, limit?: number) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.get("products/categories/get", {
        params: {
          page: page && typeof page === "number" ? page : 1,
          limit: limit && typeof limit === "number" ? limit : 10,
        },
      });
      if (!res) {
        throw new Error("Failed to fetch products");
      }
      const data = res.data;

      set({ categories: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createCategory: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.post("products/categories/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res) {
        throw new Error("Failed to create product category");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCategories();
      }

      set({ loading: false, message: "Success create product category" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateCategory: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.patch("products/categories/patch", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res) {
        throw new Error("Failed to create product category");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCategories();
      }

      set({ loading: false, message: "Success update product category" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteCategory: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.delete(`products/categories/delete`, {
        data: id,
      });
      if (!res) {
        throw new Error("Failed to delete product category");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCategories();
      }

      set({ loading: false, message: "Success delete product category" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchProducts: async (page?: number, limit?: number) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.get("products/get", {
        params: {
          page: page && typeof page === "number" ? page : 1,
          limit: limit && typeof limit === "number" ? limit : 10,
        },
      });
      if (!res) {
        throw new Error("Failed to fetch products");
      }
      const data = res.data;

      set({ products: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createProduct: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.post("products/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res) {
        throw new Error("Failed to create product");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchProducts();
      }

      set({ loading: false, message: "Success create product" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateProduct: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.patch("products/patch", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res) {
        throw new Error("Failed to create product");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchProducts();
      }

      set({ loading: false, message: "Success update product" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.delete(`products/delete`, {
        data: id,
      });
      if (!res) {
        throw new Error("Failed to delete product");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchProducts();
      }

      set({ loading: false, message: "Success delete product" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
