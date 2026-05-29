import express from "express";
import {
  userRoute,
  companyRoute,
  authRoute,
  categoryRoute,
} from "./routes/index.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/", companyRoute);
router.use("/", authRoute);
router.use("/", categoryRoute);

export default router;
