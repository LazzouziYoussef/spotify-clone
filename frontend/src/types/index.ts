export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imgUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseDate: number;
  songs: Song[];
}

export interface Stats {
  songsCount: number;
  albumsCount: number;
  usersCount: number;
  uniqueArtists: number;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  clerkId: string;
  fullName: string;
  imgUrl: string;
}

export interface SearchResult {
  songs?: Song[];
  albums?: Album[];
}

export type SearchFilter = "songs" | "albums";

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}
