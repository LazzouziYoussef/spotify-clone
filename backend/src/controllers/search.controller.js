import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const searchAll = async (req, res, next) => {
  try {
    const { q, filter } = req.query;

    // Validate query
    if (!q || q.trim().length < 3) {
      return res.status(400).json({
        message: "Search query must be at least 3 characters",
      });
    }

    const searchQuery = q.trim();
    const filters = filter ? filter.split(",") : ["songs", "albums"];

    // Build regex for case-insensitive partial matching
    const searchRegex = new RegExp(searchQuery, "i");

    const results = {};

    // Search songs if filter includes "songs"
    if (filters.includes("songs")) {
      results.songs = await Song.find({
        $or: [{ title: searchRegex }, { artist: searchRegex }],
      })
        .limit(10)
        .select("_id title artist imgUrl audioUrl duration albumId");
    }

    // Search albums if filter includes "albums"
    if (filters.includes("albums")) {
      results.albums = await Album.find({
        $or: [{ title: searchRegex }, { artist: searchRegex }],
      })
        .limit(10)
        .select("_id title artist imageUrl releaseDate songs");
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
};
