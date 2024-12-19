/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRoute, ICart, IRequest } from "@/utils";
import { create } from "zustand";
import store from "store";

interface OrderStore {
  cart: IRequest<ICart> | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  fetchCart: (username: string) => Promise<void>;
  addCart: (data: any) => Promise<void>;
  updateCart: (data: any) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  cart: null,
  loading: false,
  message: null,
  error: null,

  fetchCart: async (username: string) => {
    set({ loading: true, error: null, message: null });

    try {
      const res = await apiRoute.get("orders/cart/get", {
        params: {
          username,
        },
      });
      if (!res) {
        throw new Error("Cart is Empty");
      }
      const data = res.data;

      set({ cart: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },

  addCart: async (data: any) => {
    set({ loading: true, error: null, message: null });

    try {
      const username = store.get("username");
      const res = await apiRoute.post("orders/cart/add", data);
      if (!res) {
        throw new Error("Failed to add cart");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCart(username);
      }

      set({ loading: false, message: "Success add cart item" });
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },

  updateCart: async (data: any) => {
    set({ loading: true, error: null, message: null });

    try {
      const username = store.get("username");
      const res = await apiRoute.patch("orders/cart/patch", data);
      if (!res) {
        throw new Error("Failed to update cart");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCart(username);
      }

      set({ loading: false, message: "Success update cart item" });
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },
}));
