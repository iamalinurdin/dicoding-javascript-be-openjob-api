import express from "express";
import { userRoute, companyRoute } from "./routes/index.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/", companyRoute);

export default router;
