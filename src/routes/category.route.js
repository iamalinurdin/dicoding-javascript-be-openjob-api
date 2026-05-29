import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/index.js";
import { authenticateToken, validate } from "../middlewares/index.js";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../schemas/index.js";

const categoryRoute = express.Router();

categoryRoute.get("/categories", getCategories);
categoryRoute.post(
  "/categories",
  authenticateToken,
  validate(categoryCreateSchema),
  createCategory,
);
categoryRoute.get("/categories/:id", getCategoryById);
categoryRoute.put(
  "/categories/:id",
  authenticateToken,
  validate(categoryUpdateSchema),
  updateCategory,
);
categoryRoute.delete("/categories/:id", authenticateToken, deleteCategory);

export default categoryRoute;
