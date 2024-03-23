import { Router } from "express";
import UserController from "../controllers/UserController.js";
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

const userRoutes = Router()

userRoutes.post("/auth/signup", UserController.signUp)
userRoutes.post("/auth/signin", UserController.signIn)
userRoutes.get("/checkuser", verifyToken, UserController.checkUser)
userRoutes.put("/update-user", verifyToken, imageUpload.single("image"), UserController.updateUser)

export default userRoutes;