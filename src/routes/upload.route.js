import express from "express";
import { upload } from "../utils/storage.js";
import {
  deleteDocument,
  getDocument,
  getDocuments,
  uploadFile,
} from "../controllers/index.js";
import { authenticateToken } from "../middlewares/index.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/documents",
  authenticateToken,
  upload.single("document"),
  uploadFile,
);
uploadRouter.get("/documents", authenticateToken, getDocuments);
uploadRouter.get("/documents/:id", authenticateToken, getDocument);
uploadRouter.delete("/documents/:id", authenticateToken, deleteDocument);

export default uploadRouter;
