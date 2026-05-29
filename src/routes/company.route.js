import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/index.js";
import { authenticateToken, validate } from "../middlewares/index.js";
import { companyCreateSchema, companyUpdateSchema } from "../schemas/index.js";

const companyRoute = express.Router();

companyRoute.get("/companies", getCompanies);
companyRoute.post(
  "/companies",
  authenticateToken,
  validate(companyCreateSchema),
  createCompany,
);
companyRoute.get("/companies/:id", getCompanyById);
companyRoute.put(
  "/companies/:id",
  authenticateToken,
  validate(companyUpdateSchema),
  updateCompany,
);
companyRoute.delete("/companies/:id", authenticateToken, deleteCompany);

export default companyRoute;
