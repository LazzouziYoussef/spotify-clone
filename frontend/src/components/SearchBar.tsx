import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import SearchDropdown from "./SearchDropdown";
import { useSearchStore } from "@/stores/useSearchStore";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { addToHistory } = useSearchStore();

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearchClick = () => {
    setIsExpanded(true);
    setShowDropdown(true);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowDropdown(true);
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchSubmit = (searchQuery: string) => {
    if (searchQuery.trim().length >= 3) {
      addToHistory(searchQuery);
    }
  };

  return (
    <div ref={containerRef} className="relative z-50">
      {!isExpanded ? (
        <button
          onClick={handleSearchClick}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          aria-label="Search"
        >
          <Search className="size-5 text-zinc-400" />
        </button>
      ) : (
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search songs, albums..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="pl-10 pr-10 bg-zinc-800 border-zinc-700 focus:border-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-500"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-700 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="size-4 text-zinc-400" />
            </button>
          )}
        </div>
      )}

      {isExpanded && showDropdown && (
        <SearchDropdown
          query={query}
          onQuerySelect={(q) => {
            setQuery(q);
            handleSearchSubmit(q);
          }}
          onClose={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
