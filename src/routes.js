import express from "express";
import { userRoute } from "./routes/index.js";

const router = express.Router();

router.use("/", userRoute);

export default router;
