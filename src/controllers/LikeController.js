import Post from "../models/Post.js";
import Answer from "../models/Answer.js";
import Like from "../models/Like.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class LikeController {
    static async likeOrDislike(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id, {raw: true})

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const like = await Like.findOne({where: {UserId:user.id, PostId:post.id}, raw: true})

            if(like){
                post.liked--
                await Like.destroy({where: {UserId:user.id, PostId:post.id}})
            } else {
                post.liked++
                await Like.create({UserId: user.id, PostId:post.id})
            }

            await Post.update(post, {where:{id:id}})

            res.status(200).json({message:"success/successfully-disliked-liked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
}