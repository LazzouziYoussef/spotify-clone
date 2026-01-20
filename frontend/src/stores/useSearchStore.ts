import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchHistoryItem, SearchFilter } from "@/types";

interface SearchStore {
  // State
  searchHistory: SearchHistoryItem[];
  activeFilters: SearchFilter[];

  // Actions
  addToHistory: (query: string) => void;
  removeFromHistory: (query: string) => void;
  clearHistory: () => void;
  toggleFilter: (filter: SearchFilter) => void;
  setFilters: (filters: SearchFilter[]) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      // Initial state
      searchHistory: [],
      activeFilters: ["songs", "albums"],

      // Add search query to history (max 3 items)
      addToHistory: (query) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        set((state) => {
          // Remove duplicate if exists
          const filtered = state.searchHistory.filter(
            (item) => item.query !== trimmedQuery
          );

          // Add new item at the beginning
          const newHistory = [
            { query: trimmedQuery, timestamp: Date.now() },
            ...filtered,
          ].slice(0, 3); // Keep only 3 most recent

          return { searchHistory: newHistory };
        });
      },

      // Remove specific search from history
      removeFromHistory: (query) => {
        set((state) => ({
          searchHistory: state.searchHistory.filter(
            (item) => item.query !== query
          ),
        }));
      },

      // Clear all search history
      clearHistory: () => {
        set({ searchHistory: [] });
      },

      // Toggle filter on/off
      toggleFilter: (filter) => {
        set((state) => {
          const isActive = state.activeFilters.includes(filter);

          if (isActive) {
            // Don't allow removing all filters
            if (state.activeFilters.length === 1) return state;
            return {
              activeFilters: state.activeFilters.filter((f) => f !== filter),
            };
          } else {
            return {
              activeFilters: [...state.activeFilters, filter],
            };
          }
        });
      },

      // Set filters directly
      setFilters: (filters) => {
        set({ activeFilters: filters });
      },

      // Reset to default filters
      resetFilters: () => {
        set({ activeFilters: ["songs", "albums"] });
      },
    }),
    {
      name: "search-storage",
      partialize: (state) => ({
        searchHistory: state.searchHistory,
      }),
    }
  )
);
