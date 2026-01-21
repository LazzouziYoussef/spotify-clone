import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { isAxiosError } from "axios";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  stats: Stats;
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: String) => Promise<void>;

  fetchSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;

  deleteSong: (songId: string) => Promise<void>;
  deleteAlbum: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  albums: [],
  stats: { albumsCount: 0, songsCount: 0, uniqueArtists: 0, usersCount: 0 },
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ isLoading: false, albums: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching albums." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching the album." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching songs." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching stats." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching featured songs." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching made for you songs." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data, error: null });
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while fetching trending songs." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSong: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Song");
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while deleting the song." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
  deleteAlbum: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?._id
            ? { ...song, album: null }
            : song,
        ),
      }));
      toast.success("Album Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Album");
      if (isAxiosError(error)) {
        set({ error: error.response?.data?.message || "An error occurred while deleting the album." });
      } else {
        set({ error: "An unknown error occurred." });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));