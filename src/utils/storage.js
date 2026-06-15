import path from "path";
import multer from "multer";
import { ClientError } from "../exceptions/index.js";
import fs from "fs";

const UPLOAD_FOLDER = path.resolve(process.cwd(), "src/assets");

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("application/pdf")) {
      cb(null, true);
    } else {
      cb(new ClientError("only image files are allowed"), false);
    }
  },
});

export { UPLOAD_FOLDER, storage, upload };
