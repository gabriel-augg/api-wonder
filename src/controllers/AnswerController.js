import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import Answer from "../models/Answer.js";
import User from "../models/User.js";

export default class AnswerController {
    static async create(req, res){
        const {description, postId} = req.body;

        if(!description || !postId){
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const answerData = {
            description,
            UserId: user.id,
            PostId: postId,
            username: user.username
        }

        try {
            const answer = await Answer.create(answerData)

            let dataAnswer = answer.get({plain: true})

            dataAnswer.User = {
                username: user.username
            }
            
            res.status(201).json({answer: dataAnswer})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async addLikesCount(req, res){
        const { id } = req.params

        try {
            const answer = await Answer.findByPk(id)

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            answer.likesCount++

            await answer.save()

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removeLikesCount(req, res){
        const { id } = req.params

        try {
            const answer = await Answer.findByPk(id)

            if(!answer){
                res.status(404).json({message: "error/answer-not-found"})
                return
            }

            answer.likesCount--

            await answer.save()

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

}