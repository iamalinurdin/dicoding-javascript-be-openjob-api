import express from "express";
import { login, logout, refreshToken } from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
} from "../schemas/index.js";

const authRoute = express.Router();

authRoute.post("/authentications", validate(loginSchema), login);
authRoute.put("/authentications", validate(refreshTokenSchema), refreshToken);
authRoute.delete("/authentications", validate(logoutSchema), logout);

export default authRoute;
