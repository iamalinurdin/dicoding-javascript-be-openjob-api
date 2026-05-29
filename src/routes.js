import express from "express";
import { userRoute, companyRoute, authRoute } from "./routes/index.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/", companyRoute);
router.use("/", authRoute);

export default router;
