import express from "express";
import {
  getJobs,
  getJobById,
  getJobByCategory,
  getJobByCompany,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/index.js";
import { authenticateToken, validate } from "../middlewares/index.js";
import { jobCreateSchema, jobUpdateSchema } from "../schemas/index.js";

const jobRoute = express.Router();

jobRoute.get("/jobs", getJobs);
jobRoute.get("/jobs/:id", getJobById);
jobRoute.get("/jobs/company/:companyId", getJobByCompany);
jobRoute.get("/jobs/category/:categoryId", getJobByCategory);
jobRoute.post("/jobs", authenticateToken, validate(jobCreateSchema), createJob);
jobRoute.put(
  "/jobs/:id",
  authenticateToken,
  validate(jobUpdateSchema),
  updateJob,
);
jobRoute.delete("/jobs/:id", authenticateToken, deleteJob);

export default jobRoute;
