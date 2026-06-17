import { ClientError, NotFoundError } from "../exceptions/index.js";
import { uploadRepository } from "../repositories/index.js";
import { response } from "../utils/index.js";
import fs from "fs";
import path from "path";

export const uploadFile = async (req, res, next) => {
  if (!req.file) {
    return next(new ClientError("File is required", 400));
  }

  const hostname = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  const encodedFilename = encodeURIComponent(req.file.filename);
  const fileLocation = `http://${hostname}:${port}/uploads/${encodedFilename}`;

  await uploadRepository.createDocument({
    documentId: req.file.filename.split("-")[0],
    location: fileLocation,
    originalName: req.file.originalname,
    size: req.file.size,
  });

  response(res, 201, "success", {
    documentId: req.file.filename.split("-")[0],
    filename: fileLocation,
    originalName: req.file.originalname,
    size: req.file.size,
  });
};

export const getDocuments = async (req, res, next) => {
  const documents = await uploadRepository.getDocuments();

  response(res, 200, "success", {
    documents,
  });
};

export const getDocument = async (req, res, next) => {
  const { id } = req.params;
  const document = await uploadRepository.getDocumentById(id);

  if (!document) {
    return next(new NotFoundError("not found", 404));
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${document.location}"`,
  );
  res.setHeader("Content-Type", "application/pdf");

  response(res, 200, "success", {
    document,
  });
};

export const deleteDocument = async (req, res, next) => {
  const { id } = req.params;
  const document = await uploadRepository.deleteDocument(id);

  if (!document) {
    return next(new NotFoundError("not found", 404));
  }

  response(res, 200, "success", {
    document,
  });
};
