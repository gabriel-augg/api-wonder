import { Router } from "express";
import QuestionController from "../controllers/QuestionController.js";
import verifyToken from "../helpers/verify-token.js"

const questionRoutes = Router()

questionRoutes.post("/create", verifyToken, QuestionController.create)
questionRoutes.get("/", QuestionController.getAll)
questionRoutes.get("/id/:id", QuestionController.getQuestionById)
questionRoutes.put("/id/:id", verifyToken, QuestionController.updateQuestionById)
questionRoutes.delete("/id/:id", verifyToken, QuestionController.removeQuestionById)

export default questionRoutes;