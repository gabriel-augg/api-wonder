import { Router } from "express";
import LikeAnswerController from "../controllers/LikeAnswerController.js";
import verifyToken from '../helpers/verify-token.js'

const likeAnswerRoutes = Router()

likeAnswerRoutes.patch("/answers/like/:id", verifyToken, LikeAnswerController.like)
likeAnswerRoutes.patch("/answers/dislike/:id", verifyToken, LikeAnswerController.dislike)
likeAnswerRoutes.get("/answers/:id", verifyToken, LikeAnswerController.getItemLike)

export default likeAnswerRoutes;