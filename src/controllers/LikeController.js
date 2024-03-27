import Post from "../models/Post.js";
import Answer from "../models/Answer.js";
import Like from "../models/Like.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class LikeController {
    static async like(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id, {raw: true})

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const likeItem = await Like.findOne({where: {UserId:user.id, PostId:post.id}, raw: true})

            post.liked++

            if(!likeItem){
                await Like.create({UserId: user.id, PostId:post.id})
            } else if (likeItem.status) {
                res.status(401).json({message: "error/access-denied"})
                return
            }

            likeItem.status = true
            await Like.update(likeItem, {where:{id:likeItem.id}})
            
            post.liked++
            await Post.update(post, {where:{id:id}})

            res.status(200).json({message:"success/successfully-liked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async dislike(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id, {raw: true})

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const likeItem = await Like.findOne({where: {UserId:user.id, PostId:post.id}, raw: true})

            if(!likeItem || !likeItem.status){
                res.status(401).json({message: "error/access-denied"})
                return
            }
            console.log(likeItem)

            likeItem.status = false

            console.log(likeItem)
            await Like.update(likeItem, {where: {id:likeItem.id}})
        
            post.liked--
            await Post.update(post, {where:{id:id}})

            res.status(200).json({message:"success/successfully-disliked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

}