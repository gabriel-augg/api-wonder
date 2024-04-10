import { Router } from "express";
import LikeController from "../controllers/LikeController.js";
import verifyToken from "../helpers/verify-token.js";

const likeRoutes = Router()

likeRoutes.get("/:id/post", verifyToken, LikeController.isPostLiked)
likeRoutes.get("/:id/answer", verifyToken, LikeController.isAnswerLiked)
likeRoutes.post("/post/:id/like", verifyToken, LikeController.likePost)
likeRoutes.post("/answer/:id/like", verifyToken, LikeController.likeAnswer)
likeRoutes.delete("/post/:id/dislike", verifyToken, LikeController.dislikePost)
likeRoutes.delete("/answer/:id/dislike", verifyToken, LikeController.dislikeAnswer)


export default likeRoutes;