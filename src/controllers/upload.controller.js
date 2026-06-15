import { ClientError } from "../exceptions/index.js";
import { response } from "../utils/index.js";

export const uploadFile = async (req, res, next) => {
  if (!req.file) {
    return next(new ClientError("no file uploaded"));
  }

  const hostname = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  const encodedFilename = encodeURIComponent(req.file.filename);
  const fileLocation = `http://${hostname}:${port}/uploads/${encodedFilename}`;

  response(res, 201, "success", {
    fileLocation,
  });
};
