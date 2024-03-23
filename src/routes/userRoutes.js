import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRoutes = Router()

userRoutes.post("/auth/signup", UserController.signUp)

export default userRoutes;