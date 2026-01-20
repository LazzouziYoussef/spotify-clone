import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  shouldAutoplay: boolean;
  queue: Song[];
  currentIndex: number;
  setShouldAutoplay: (v: boolean) => void;
  initQueue: (songs: Song[]) => void;
  playAt: (songs: Song[], index: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  shouldAutoplay: false,
  queue: [],
  currentIndex: -1,
  setShouldAutoplay: (v: boolean) => set({ shouldAutoplay: v }),
  initQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playAt: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) {
      return;
    }
    const song = songs[startIndex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
      shouldAutoplay: true,
    });
  },
  setCurrentSong: (song: Song | null) => {
    if (!song) return;
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      isPlaying: true,
    });
  },
  togglePlay: () => {
    const willPlay = !get().isPlaying;
    set({ isPlaying: willPlay });
  },
  playNext: () => {
    const { queue, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
        shouldAutoplay: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },

  playPrev: () => {
    const { queue, currentIndex } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
        shouldAutoplay: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },
}));
