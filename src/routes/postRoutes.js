import { Router } from "express";
import PostController from "../controllers/PostController.js";
import verifyToken from "../helpers/verify-token.js"

const postRoutes = Router()

postRoutes.post("/create", verifyToken, PostController.create)
postRoutes.get("/", PostController.getAll)
postRoutes.get("/my-posts", verifyToken, PostController.getAllUserPosts)
postRoutes.get("/:id/get-post", PostController.getPostById)
postRoutes.put("/:id/update-post", verifyToken, PostController.updatePostById)
postRoutes.patch("/:id/add-answers-count", verifyToken, PostController.addAnswersCount)
postRoutes.patch("/:id/remove-answers-count", verifyToken, PostController.removeAnswersCount)
postRoutes.patch("/:id/add-likes-count", verifyToken, PostController.addLikesCount)
postRoutes.patch("/:id/remove-likes-count", verifyToken, PostController.removeLikesCount)
postRoutes.delete("/:id/remove-post", verifyToken, PostController.removePostById)

export default postRoutes;