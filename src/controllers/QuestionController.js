import Question from "../models/Question.js";
import LikedQuestion from "../models/LikedQuestion.js";
import User from "../models/User.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class QuestionController {
    static async create(req, res){
        const { description } = req.body;

        if( !description ) {
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const questionData = {
            description,
            UserId: user.id
        }

        try {
            const newQuestion = await Question.create(questionData)
            res.status(201).json({question: newQuestion})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async getQuestionById(req, res){
        const { id } = req.params;

        try {
            const question = await Question.findByPk(id)

            if(!question){
                res.status(404).json({message: "error/question-not-found"})
                return
            }

            res.status(200).json({question: question})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
        
    }

    static async getAll(req, res){
        try {
            const questions = await Question.findAll({include: {
                model: User,
                attributes: {
                    exclude: ['password_hash']
                }
            }})
            res.status(200).json({questions: questions})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async updateQuestionById(req, res){
        const { id } = req.params;
        const { description } = req.body;

        if(!description){
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        try {
            const question = await Question.findByPk(id, {raw: true})

            if(!question){
                res.status(404).json({message: "error/question-not-found"})
                return
            }

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            if(question.UserId !== currentUser.id){
                res.status(401).json({message: "error/access-denied"})
            }

            question.description = description

            await Question.update(question, {where: {id:id}})

            res.status(200).json({question: question})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removeQuestionById(req, res){
        const { id } = req.params;

        try {
            const question = await Question.findByPk(id)

            if(!question){
                res.status(404).json({message: "error/question-not-found"})
                return
            }

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            if(currentUser.id !== question.UserId){
                res.status(401).json({message: "error/access-denied"})
                return
            }

            await Question.destroy({where: {id:id}})

            res.status(200).json({message: "success/message-deleted"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
}