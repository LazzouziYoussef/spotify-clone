import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/stores/useSearchStore";
import type { SearchResult } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { Badge } from "./ui/badge";
import { X, Clock, Loader2 } from "lucide-react";
import SearchResultItem from "./SearchResultItem";
import { ScrollArea } from "./ui/scroll-area";

interface SearchDropdownProps {
  query: string;
  onQuerySelect: (query: string) => void;
  onClose: () => void;
}

const SearchDropdown = ({
  query,
  onQuerySelect,
  onClose,
}: SearchDropdownProps) => {
  const [results, setResults] = useState<SearchResult>({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    searchHistory,
    removeFromHistory,
    activeFilters,
    toggleFilter,
  } = useSearchStore();

  const debouncedQuery = useDebounce(query, 300);

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 3) {
        setResults({});
        return;
      }

      setIsLoading(true);
      try {
        const filterParam = activeFilters.join(",");
        const { data } = await axiosInstance.get<SearchResult>(
          `/search?q=${encodeURIComponent(debouncedQuery)}&filter=${filterParam}`
        );
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setResults({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, activeFilters]);

  const hasResults =
    (results.songs && results.songs.length > 0) ||
    (results.albums && results.albums.length > 0);

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden z-50 w-80">
      <div className="p-3 border-b border-zinc-800">
        {/* Filter Chips */}
        <div className="flex gap-2 mb-3">
          <Badge
            variant={activeFilters.includes("songs") ? "default" : "outline"}
            className="cursor-pointer gap-1"
            onClick={() => toggleFilter("songs")}
          >
            Songs
            {activeFilters.includes("songs") && (
              <X
                className="size-3"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("songs");
                }}
              />
            )}
          </Badge>
          <Badge
            variant={activeFilters.includes("albums") ? "default" : "outline"}
            className="cursor-pointer gap-1"
            onClick={() => toggleFilter("albums")}
          >
            Albums
            {activeFilters.includes("albums") && (
              <X
                className="size-3"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("albums");
                }}
              />
            )}
          </Badge>
        </div>

        {/* Recent Searches */}
        {searchHistory.length > 0 && !query && (
          <div>
            <div className="text-xs text-zinc-400 mb-2">Recent Searches</div>
            <div className="space-y-1">
              {searchHistory.map((item) => (
                <div
                  key={item.timestamp}
                  className="flex items-center justify-between p-2 hover:bg-zinc-800 rounded-md cursor-pointer group transition-colors"
                  onClick={() => onQuerySelect(item.query)}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-zinc-400" />
                    <span className="text-sm text-zinc-200">{item.query}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item.query);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-white"
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <ScrollArea className="h-[calc(100vh-350px)] max-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="size-6 animate-spin text-emerald-500" />
          </div>
        ) : query.length >= 3 && hasResults ? (
          <div className="p-3 space-y-4">
            {/* Songs Results */}
            {results.songs && results.songs.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-zinc-400 mb-2 px-2 uppercase tracking-wider">
                  Songs
                </div>
                <div className="space-y-1">
                  {results.songs.map((song) => (
                    <SearchResultItem
                      key={song._id}
                      type="song"
                      item={song}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Albums Results */}
            {results.albums && results.albums.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-zinc-400 mb-2 px-2 uppercase tracking-wider">
                  Albums
                </div>
                <div className="space-y-1">
                  {results.albums.map((album) => (
                    <SearchResultItem
                      key={album._id}
                      type="album"
                      item={album}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : query.length >= 3 && !hasResults ? (
          <div className="p-8 text-center text-zinc-400 text-sm">
            No results found for "{query}"
          </div>
        ) : query.length > 0 && query.length < 3 ? (
          <div className="p-8 text-center text-zinc-400 text-sm">
            Type at least 3 characters to search
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );
};

export default SearchDropdown;
