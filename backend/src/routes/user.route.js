import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
} from "../controllers/playlist.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.post("/playlist", createPlaylist);
router.get("/playlists", getAllPlaylists);
router.get("/playlists/:PlaylistId", getPlaylistById);

export default router;
