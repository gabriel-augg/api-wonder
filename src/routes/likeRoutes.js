import { Router } from "express";
import LikeController from "../controllers/LikeController.js";
import verifyToken from "../helpers/verify-token.js";

const likeRoutes = Router()

likeRoutes.patch("/post/:id", verifyToken, LikeController.likeOrDislike)

export default likeRoutes;