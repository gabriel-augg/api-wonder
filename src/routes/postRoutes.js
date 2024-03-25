import { Router } from "express";
import PostController from "../controllers/PostController.js";
import verifyToken from "../helpers/verify-token.js"

const postRoutes = Router()

postRoutes.post("/create", verifyToken, PostController.create)
postRoutes.get("/", PostController.getAll)
postRoutes.get("/id/:id", PostController.getPostById)
postRoutes.put("/id/:id", verifyToken, PostController.updatePostById)
postRoutes.delete("/id/:id", verifyToken, PostController.removePostById)

export default postRoutes;