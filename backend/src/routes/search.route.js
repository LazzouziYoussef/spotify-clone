import { Router } from "express";
import { searchAll } from "../controllers/search.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

// GET /api/search?q=query&filter=songs,albums
router.get("/", protectRoute, searchAll);

export default router;
