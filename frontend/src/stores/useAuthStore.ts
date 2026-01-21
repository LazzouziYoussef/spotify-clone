import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ isAdmin: false, error: error.response.data.message });
      } else {
        set({ isAdmin: false, error: "An unexpected error occurred" });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
