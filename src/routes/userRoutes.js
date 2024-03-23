import { Router } from "express";
import UserController from "../controllers/UserController.js";
import imageUpload from "../helpers/image-upload.js";

const userRoutes = Router()

userRoutes.post("/auth/signup", UserController.signUp)
userRoutes.post("/auth/signin", UserController.signIn)
userRoutes.get("/checkuser", UserController.checkUser)
userRoutes.put("/update-user", imageUpload.single("image"), UserController.updateUser)

export default userRoutes;