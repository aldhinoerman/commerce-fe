/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRoute, ICart, IOrder, IRequest } from "@/utils";
import { create } from "zustand";
import store from "store";

interface OrderStore {
  orders: IRequest<IOrder> | null;
  cart: IRequest<ICart> | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  fetchOrders: (
    page?: number,
    limit?: number,
    username?: string
  ) => Promise<void>;
  fetchCart: () => Promise<void>;
  addCart: (data: any) => Promise<void>;
  updateCart: (data: any) => Promise<void>;
  deleteCart: (data: any) => Promise<void>;
  checkout: () => Promise<void>;
  payment: (orderId: number) => Promise<void>;
}

const username = store.get("username");

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: null,
  cart: null,
  loading: false,
  message: null,
  error: null,

  fetchCart: async () => {
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
      const res = await apiRoute.post("orders/cart/add", data);
      if (!res) {
        throw new Error("Failed to add cart");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCart();
      }

      set({ loading: false, message: "Success add cart item" });
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },

  updateCart: async (data: any) => {
    set({ loading: true, error: null, message: null });

    try {
      const res = await apiRoute.patch("orders/cart/patch", data);
      if (!res) {
        throw new Error("Failed to update cart");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCart();
      }

      set({ loading: false, message: "Success update cart item" });
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },

  deleteCart: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.delete("orders/cart/delete", { data });
      if (!res) {
        throw new Error("Failed to delete item");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchCart();
      }

      set({ loading: false, message: "Success delete item" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  checkout: async () => {
    set({ loading: true, error: null, message: null });

    try {
      const res = await apiRoute.post("orders/checkout", {
        username,
      });
      if (!res) {
        throw new Error("Failed to add checkout");
      }

      if (res?.status === 200 || res?.status === 201) {
        set({ loading: false, message: "Success add checkout" });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },

  fetchOrders: async (page?: number, limit?: number, username?: string) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.get("orders/get", {
        params: {
          page: page && typeof page === "number" ? page : 1,
          limit: limit && typeof limit === "number" ? limit : 10,
          username,
        },
      });
      if (!res) {
        throw new Error("Failed to fetch orders");
      }
      const data = res.data;

      set({ orders: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  payment: async (orderId: number) => {
    set({ loading: true, error: null, message: null });

    try {
      const res = await apiRoute.post("orders/payment", {
        orderId,
        username,
      });
      if (!res) {
        throw new Error("Failed to pay item");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchOrders(1, 100, username);
      }
      set({ loading: false, message: "Success payment" });
    } catch (error: any) {
      set({ error: error.message, loading: false, message: error.message });
    }
  },
}));
