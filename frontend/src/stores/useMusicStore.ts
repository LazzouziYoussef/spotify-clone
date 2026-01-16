import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface MusicStore {
  songs: any[];
  albums: any[];
  isLoading: boolean;
  error: string | null;

  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ isLoading: true, albums: response.data, error: null });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
