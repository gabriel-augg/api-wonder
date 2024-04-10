import { Router } from "express";
import followController from "../controllers/followController.js";
import verifyToken from "../helpers/verify-token.js";

const followRoutes = Router()

followRoutes.get("/:id/followed", verifyToken, followController.isFollowed)
followRoutes.post("/:id/follow", verifyToken, followController.follow)
followRoutes.delete("/:id/unfollow", verifyToken, followController.unfollow)


export default followRoutes;