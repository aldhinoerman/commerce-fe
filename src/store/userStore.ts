/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRoute, IRequest } from "@/utils";
import { create } from "zustand";

interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  users: IRequest<IUser> | null;
  loading: boolean;
  error: string | null;
  message: string;
  fetchUsers: (page?: number) => Promise<void>;
  registerUser: (data: any) => Promise<void>;
  updateUser: (data: any) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: null,
  loading: false,
  message: "",
  error: null,

  fetchUsers: async (page?: number, limit?: number) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.get("users/get", {
        params: {
          page: page && typeof page === "number" ? page : 1,
          limit: limit && typeof limit === "number" ? limit : 10,
        },
      });
      if (!res) {
        throw new Error("Failed to fetch users");
      }
      const data = res.data;

      set({ users: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  registerUser: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.post("users/register", data);
      if (!res) {
        throw new Error("Failed to register user");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchUsers();
      }

      set({ loading: false, message: "Success register user" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateUser: async (data: any) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.put(`users/put/${data.id}`, data);
      if (!res) {
        throw new Error("Failed to register user");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchUsers();
      }

      set({ loading: false, message: "Success update user" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const res = await apiRoute.delete(`users/delete`, { data: id });
      if (!res) {
        throw new Error("Failed to delete user");
      }

      if (res?.status === 200 || res?.status === 201) {
        await get().fetchUsers();
      }

      set({ loading: false, message: "Success delete user" });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
