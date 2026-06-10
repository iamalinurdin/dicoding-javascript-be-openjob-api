import express from "express";
import { createUser, getUserById } from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import { createUserSchema } from "../schemas/index.js";

const userRoute = express.Router();

userRoute.post("/users", validate(createUserSchema), createUser);
userRoute.get("/users/:id", getUserById);

export default userRoute;
