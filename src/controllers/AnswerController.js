import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import Answer from "../models/Answer.js";

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
            PostId: postId
        }

        try {
            const answer = await Answer.create(answerData)
            res.status(201).json({answer: answer})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
}