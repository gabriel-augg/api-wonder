import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRoutes = Router()

userRoutes.post("/auth/signup", UserController.signUp)
userRoutes.post("/auth/signin", UserController.signIn)
userRoutes.get("/checkuser", UserController.checkUser)
userRoutes.put("/update-user", UserController.updateUser)

export default userRoutes;