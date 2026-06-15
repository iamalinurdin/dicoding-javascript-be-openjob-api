import express from "express";
import {
  userRoute,
  companyRoute,
  authRoute,
  categoryRoute,
  jobRoute,
  applicationRoute,
  bookmarkRoute,
  uploadRouter,
} from "./routes/index.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/", companyRoute);
router.use("/", authRoute);
router.use("/", categoryRoute);
router.use("/", jobRoute);
router.use("/", applicationRoute);
router.use("/", bookmarkRoute);
router.use("/", uploadRouter);

export default router;
