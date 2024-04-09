import { Router } from "express";
import UserController from "../controllers/UserController.js";
import verifyToken from "../helpers/verify-token.js";

const userRoutes = Router()

userRoutes.get("/check-user", verifyToken, UserController.checkUser)
userRoutes.get("/:id/get-user", UserController.getUserById)
userRoutes.patch("/add-posts-count", verifyToken, UserController.addPostsCount)
userRoutes.patch("/remove-posts-count", verifyToken, UserController.removePostsCount)
userRoutes.patch("/add-follows-count", verifyToken, UserController.addFollowsCount)
userRoutes.patch("/remove-follows-count", verifyToken, UserController.removeFollowsCount)
userRoutes.put("/update-user", verifyToken, UserController.updateUser)


export default userRoutes;