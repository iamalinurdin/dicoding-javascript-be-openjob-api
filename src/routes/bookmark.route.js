import express from "express";
import {
  getBookmarks,
  getBookmarkById,
  addBookmark,
  deleteBookmark,
} from "../controllers/index.js";
import { authenticateToken } from "../middlewares/index.js";

const bookmarkRoute = express.Router();

bookmarkRoute.get("/bookmarks", authenticateToken, getBookmarks);
bookmarkRoute.get(
  "/jobs/:jobId/bookmark/:id",
  authenticateToken,
  getBookmarkById,
);
bookmarkRoute.post("/jobs/:jobId/bookmark", authenticateToken, addBookmark);
bookmarkRoute.delete(
  "/jobs/:jobId/bookmark",
  authenticateToken,
  deleteBookmark,
);

export default bookmarkRoute;
