import { Router } from "express";
import LikeAnswerController from "../controllers/LikeAnswerController.js";
import verifyToken from '../helpers/verify-token.js'

const likeAnswerRoutes = Router()

likeAnswerRoutes.patch("/answer/:id", verifyToken, LikeAnswerController.likeOrDislike)

export default likeAnswerRoutes;