import { Router } from "express";
import LikedQuestionController from "../controllers/LikedQuestionController.js";
import verifyToken from "../helpers/verify-token.js";

const likedQuestionRoutes = Router()

likedQuestionRoutes.patch("/:id", verifyToken, LikedQuestionController.likeOrDislike)

export default likedQuestionRoutes;