import express from "express";
import {
  userRoute,
  companyRoute,
  authRoute,
  categoryRoute,
  jobRoute,
} from "./routes/index.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/", companyRoute);
router.use("/", authRoute);
router.use("/", categoryRoute);
router.use("/", jobRoute);

export default router;
