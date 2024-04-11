import express from "express";
import protectRoute from "../middleware/protectRoute.js";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favourite.controller.js";

const router = express.Router();

router.post("/", protectRoute, addFavorite);
router.get("/", protectRoute, getFavorites);
router.delete("/:favouriteId", protectRoute, removeFavorite);

export default router;
