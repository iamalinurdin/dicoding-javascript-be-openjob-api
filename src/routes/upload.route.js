import express from "express";
import { upload } from "../utils/storage.js";
import { uploadFile } from "../controllers/index.js";
import { authenticateToken } from "../middlewares/index.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/documents",
  authenticateToken,
  upload.single("file"),
  uploadFile,
);

export default uploadRouter;
