import { Router } from "express";
import LikeController from "../controllers/LikeController.js";
import verifyToken from "../helpers/verify-token.js";

const likeRoutes = Router()

likeRoutes.get("/:id/posts", verifyToken, LikeController.isPostLiked)
likeRoutes.get("/:id/answers", verifyToken, LikeController.isAnswerLiked)
likeRoutes.post("/posts/:id/like", verifyToken, LikeController.likePost)
likeRoutes.post("/answers/:id/like", verifyToken, LikeController.likeAnswer)
likeRoutes.delete("/posts/:id/dislike", verifyToken, LikeController.dislikePost)
likeRoutes.delete("/answers/:id/dislike", verifyToken, LikeController.dislikeAnswer)


export default likeRoutes;