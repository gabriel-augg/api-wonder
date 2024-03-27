import Post from "../models/Post.js";
import User from "../models/User.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import Answer from "../models/Answer.js";
import formatDate from "../helpers/format-date.js";
import { Op } from "sequelize";

export default class PostController {
    static async create(req, res){
        const { description } = req.body;

        if( !description ) {
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const postData = {
            description,
            UserId: user.id
        }

        try {
            const newPost = await Post.create(postData)
            res.status(201).json({post: newPost})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async getPostById(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ["username"]
                    },
                    {
                        model: Answer
                    }
                ]
            })

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            res.status(200).json({post: post})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
        
    }

    static async getAll(req, res){
        const {limit} = req.query

        let search = ''
     
        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        try {

            const posts = await Post.findAll({
                include: {
                    model: User,
                    attributes: ['username']
                },
                where: {
                    description: {[Op.like]: `%${search}%`}
                },
                order: [['createdAt', order]],
                raw: true,
                limit: parseInt(limit)
            });
            
            for (const post of posts) {
                const answerQty = await Answer.count({ where: { PostId: post.id } });
                post.answer_qty = answerQty;
                post.timeAgo = formatDate(post.createdAt)
            }

            res.status(200).json({posts})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async updatePostById(req, res){
        const { id } = req.params;
        const { description } = req.body;

        if(!description){
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        try {
            const post = await Post.findByPk(id, {raw: true})

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            if(post.UserId !== currentUser.id){
                res.status(401).json({message: "error/access-denied"})
            }

            post.description = description

            await Post.update(post, {where: {id:id}})

            res.status(200).json({post: post})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removePostById(req, res){
        const { id } = req.params;

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            if(currentUser.id !== post.UserId){
                res.status(401).json({message: "error/access-denied"})
                return
            }

            await Post.destroy({where: {id:id}})

            res.status(200).json({message: "success/message-deleted"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
}