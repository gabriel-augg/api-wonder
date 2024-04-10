import Post from "../models/Post.js";
import Answer from "../models/Answer.js";
import Like from "../models/Like.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class LikeController {

    static async likePost(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const isLiked = await Like.findOne({where: {UserId: user.id, PostId: post.id}})

            if(isLiked){
                res.status(401).json({message: "error/post-already-liked"})
                return
            }

            await Like.create({UserId: user.id, PostId: post.id, AnswerId: null})

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async dislikePost(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const isPostLiked = await Like.findOne({where: {UserId:user.id, PostId: post.id}})

            if(!isPostLiked){
                res.status(404).json({message: "error/post-not-liked"})
                return
            }

            await Like.destroy({where: {id: isPostLiked.id}})
        
            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async isPostLiked(req, res){
        const {id} = req.params

        let status = null

        try {

            const token = getToken(req)
            const user = await getUserByToken(token)

            const isLiked = await Like.findOne({where: {UserId:user.id, PostId:id}})

            status = (isLiked) ? true : false

            res.status(200).json({status})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async likeAnswer(req, res){
        const { id } = req.params;

        try {
            const answer = await Answer.findByPk(id)

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const isLiked = await Like.findOne({where: {UserId: user.id, AnswerId: answer.id}})

            if(isLiked){
                res.status(401).json({message: "error/answer-already-liked"})
                return
            }

            await Like.create({UserId: user.id, PostId: null, AnswerId: answer.id})

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async dislikeAnswer(req, res){
        const { id } = req.params;

        try {
            const answer = await Answer.findByPk(id)

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const isAnswerLiked = await Like.findOne({where: {UserId: user.id, AnswerId: answer.id}})

            if(!isAnswerLiked){
                res.status(404).json({message: "error/post-not-liked"})
                return
            }

            await Like.destroy({where: {id: isAnswerLiked.id}})
        
            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async isAnswerLiked(req, res){
        const {id} = req.params

        let status = null

        try {

            const token = getToken(req)
            const user = await getUserByToken(token)

            const isLiked = await Like.findOne({where: {UserId: user.id, AnswerId: id}})

            status = (isLiked) ? true : false

            res.status(200).json({status})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

}