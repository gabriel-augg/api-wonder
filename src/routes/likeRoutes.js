import { Router } from "express";
import LikeController from "../controllers/LikeController.js";
import verifyToken from "../helpers/verify-token.js";

const likeRoutes = Router()

likeRoutes.patch("/posts/like/:id", verifyToken, LikeController.like)
likeRoutes.patch("/posts/dislike/:id", verifyToken, LikeController.dislike)

export default likeRoutes;