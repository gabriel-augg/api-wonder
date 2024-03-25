import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRoutes = Router()

authRoutes.post("/signup", AuthController.signUp)
authRoutes.post("/signin", AuthController.signIn)

export default authRoutes;