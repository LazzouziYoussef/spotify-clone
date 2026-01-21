import type { Song, Album } from "@/types";
import { Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { axiosInstance } from "@/lib/axios";

interface SearchResultItemProps {
  type: "song" | "album";
  item: Song | Album;
  onClose: () => void;
}

const SearchResultItem = ({ type, item, onClose }: SearchResultItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { playAt } = usePlayerStore();

  const handlePlayClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (type === "song") {
      const song = item as Song;
      // Use existing playAt method
      playAt([song], 0);
    } else {
      const album = item as Album;
      try {
        // Fetch album songs since we are not modifying the store to add playAlbum
        const { data } = await axiosInstance.get(`/albums/${album._id}`);
        if (data && data.songs) {
           playAt(data.songs, 0);
        }
      } catch (error) {
        console.error("Failed to fetch album songs", error);
      }
    }

    onClose();
  };

  const handleItemClick = () => {
    if (type === "song") {
      const song = item as Song;
      if (song.albumId) {
        navigate(`/albums/${song.albumId}`);
      }
    } else {
      const album = item as Album;
      navigate(`/albums/${album._id}`);
    }
    onClose();
  };

  const imgUrl =
    type === "song" ? (item as Song).imgUrl : (item as Album).imageUrl;
  const title = item.title;
  const artist = item.artist;

  return (
    <div
      className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-md cursor-pointer group transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleItemClick}
    >
      <div className="relative size-12 flex-shrink-0">
        <img
          src={imgUrl}
          alt={title}
          className="size-full object-cover rounded-sm"
        />
        {isHovered && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity"
          >
            <Play className="size-6 text-white fill-white" />
          </button>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate text-white">{title}</div>
        <div className="text-xs text-zinc-400 truncate">
          {type === "song" ? "Song" : "Album"} • {artist}
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
