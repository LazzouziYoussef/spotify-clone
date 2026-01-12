import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in Upload", error);
    throw new Error("Error when uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return req.status(400).json({ message: "Please Upload All Files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imgUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imgUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    if (albumId) {
      await Album.findById(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in CreateSong", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in delete song controller");
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseDate } = req.body;
    const imageFile = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseDate,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum");
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("error in deleteAlbum");
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
