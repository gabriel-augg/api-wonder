import { Router } from "express";
import UserController from "../controllers/UserController.js";
import verifyToken from "../helpers/verify-token.js";

const userRoutes = Router()

userRoutes.get("/checkuser", verifyToken, UserController.checkUser)
userRoutes.get("/id/:id", UserController.getUserById)
userRoutes.put("/updateuser", verifyToken, UserController.updateUser)

export default userRoutes;