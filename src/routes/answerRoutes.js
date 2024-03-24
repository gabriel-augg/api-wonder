import { Router } from "express";
import AnswerController from "../controllers/AnswerController.js";
import verifyToken from "../helpers/verify-token.js";

const answerRoutes = Router()

answerRoutes.post("/create", verifyToken, AnswerController.create)

export default answerRoutes;