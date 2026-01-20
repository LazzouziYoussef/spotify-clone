import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],

  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
