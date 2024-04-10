import { Router } from "express";
import AnswerController from "../controllers/AnswerController.js";
import verifyToken from "../helpers/verify-token.js";

const answerRoutes = Router()

answerRoutes.post("/create", verifyToken, AnswerController.create)
answerRoutes.patch("/:id/add-likes-count", verifyToken, AnswerController.addLikesCount)
answerRoutes.patch("/:id/remove-likes-count", verifyToken, AnswerController.removeLikesCount)

export default answerRoutes;