import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import Like from "../models/Like.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class LikeController {
    static async likeOrDislike(req, res){
        const { id } = req.params;

        try {
            const question = await Question.findByPk(id, {raw: true})

            if(!question){
                res.status(404).json({message: "error/question-not-found"})
                return
            }

            const token = getToken(req)
            const user = await getUserByToken(token)

            const like = await Like.findOne({where: {UserId:user.id, QuestionId:question.id}, raw: true})

            if(like){
                question.liked--
                await Like.destroy({where: {UserId:user.id, QuestionId:question.id}})
            } else {
                question.liked++
                await Like.create({UserId: user.id, QuestionId:question.id})
            }

            await Question.update(question, {where:{id:id}})

            res.status(200).json({message:"success/successfully-disliked-liked"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
}