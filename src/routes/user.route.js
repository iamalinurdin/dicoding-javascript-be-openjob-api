import express from "express";
import { createUser, getUserById } from "../controllers/index.js";
import { authenticateToken, validate } from "../middlewares/index.js";
import { createUserSchema } from "../schemas/index.js";
import { profile } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/users", validate(createUserSchema), createUser);
userRoute.get("/users/:id", getUserById);
userRoute.get("/profile", authenticateToken, profile);

export default userRoute;
