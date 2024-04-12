import { Router } from "express";
import FollowController from "../controllers/FollowController.js";
import verifyToken from "../helpers/verify-token.js";

const followRoutes = Router()

followRoutes.get("/:id/followed", verifyToken, FollowController.isFollowed)
followRoutes.post("/:id/follow", verifyToken, FollowController.follow)
followRoutes.delete("/:id/unfollow", verifyToken, FollowController.unfollow)


export default followRoutes;