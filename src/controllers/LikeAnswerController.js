import Answer from "../models/Answer.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import LikeAnswer from "../models/LikeAnswer.js";

export default class LikeAnswerController{
    static async like(req, res){
        const { id } = req.params;

        try {
            const answer = await Answer.findByPk(id, {raw: true})

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const likeItem = await LikeAnswer.findOne({where: {UserId:user.id, AnswerId:answer.id}, raw: true})

            if(!likeItem){
                await LikeAnswer.create({UserId: user.id, AnswerId:answer.id})
            } else if (likeItem.status) {
                res.status(401).json({message: "error/access-denied"})
                return
            } else if (!likeItem.status){
                likeItem.status = true
                await LikeAnswer.update(likeItem, {where:{id:likeItem.id}})
            }

            
            answer.liked++
            await Answer.update(answer, {where:{id:id}})

            res.status(200).json({message:"success/successfully-liked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async dislike(req, res){
        const { id } = req.params;

        try {
            const answer = await Answer.findByPk(id, {raw: true})

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const likeItem = await LikeAnswer.findOne({where: {UserId:user.id, AnswerId:answer.id}, raw: true})

            if(!likeItem || !likeItem.status){
                res.status(401).json({message: "error/access-denied"})
                return
            }

            likeItem.status = false

            await LikeAnswer.update(likeItem, {where: {id:likeItem.id}})
        
            answer.liked--
            await Answer.update(answer, {where:{id:id}})

            res.status(200).json({message:"success/successfully-disliked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async getItemLike(req, res){
        const {id} = req.params

        const token = getToken(req)
        const user = await getUserByToken(token)

        try {
            const likeItem = await LikeAnswer.findOne({where: {UserId:user.id, AnswerId:id}})

            if(!likeItem)(
                res.status(200).json({status: false})
            )

            res.status(200).json({status: likeItem.status})
        } catch (error) {
            console.log(error)
        }
    }
}