import express from "express";
import { validate, authenticateToken } from "../middlewares/index.js";
import {
  applyJob,
  deleteApplication,
  getApplicationById,
  getApplicationByJobId,
  getApplicationByUserId,
  getApplications,
  updateApplication,
} from "../controllers/index.js";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "../schemas/index.js";

const applicationRoute = express.Router();

applicationRoute.get("/applications", authenticateToken, getApplications);
applicationRoute.post(
  "/applications",
  authenticateToken,
  validate(createApplicationSchema),
  applyJob,
);
applicationRoute.get(
  "/applications/:id",
  authenticateToken,
  getApplicationById,
);
applicationRoute.get(
  "/applications/user/:id",
  authenticateToken,
  getApplicationByUserId,
);
applicationRoute.get(
  "/applications/job/:id",
  authenticateToken,
  getApplicationByJobId,
);
applicationRoute.put(
  "/applications/:id",
  authenticateToken,
  validate(updateApplicationSchema),
  updateApplication,
);
applicationRoute.delete(
  "/applications/:id",
  authenticateToken,
  deleteApplication,
);

export default applicationRoute;
