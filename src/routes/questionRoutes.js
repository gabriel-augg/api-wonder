import { Router } from "express";
import QuestionController from "../controllers/QuestionController.js";
import verifyToken from "../helpers/verify-token.js"

const questionRoutes = Router()

questionRoutes.post("/create", verifyToken, QuestionController.create)

export default questionRoutes;