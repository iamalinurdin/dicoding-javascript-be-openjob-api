import express from "express";
import { createUser, getUserById } from "../controllers/index.js";

const userRoute = express.Router();

userRoute.post("/users", createUser);
userRoute.get("/users/:id", getUserById);

export default userRoute;
