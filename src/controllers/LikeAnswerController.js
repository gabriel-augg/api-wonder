import Answer from "../models/Answer.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import LikeAnswer from "../models/LikeAnswer.js";

export default class LikeAnswerController{
    static async likeOrDislike(req, res){
        const { id } = req.params;

        try {
            const answer = await Answer.findByPk(id, {raw: true})

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const likeAnswer = await LikeAnswer.findOne({where: {UserId:user.id, AnswerId:answer.id}, raw: true})

            if(likeAnswer){
                answer.liked--
                await LikeAnswer.destroy({where: {UserId:user.id, AnswerId:answer.id}})
            } else {
                answer.liked++
                await LikeAnswer.create({UserId: user.id, AnswerId:answer.id})
            }

            await Answer.update(answer, {where:{id:id}})

            res.status(200).json({message:"success/successfully-disliked-liked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
}