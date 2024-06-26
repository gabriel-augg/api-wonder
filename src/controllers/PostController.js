import Post from "../models/Post.js";
import User from "../models/User.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import Answer from "../models/Answer.js";
import Like from "../models/Like.js"
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
            const post = await Post.create(postData)
            res.status(201).json({post})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async getPostById(req, res){
        const { id } = req.params;

        let offset = 0

        if(req.query.offset){
            offset = req.query.offset
        }

        try {
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ["username"]
                    },
                    {
                        model: Answer,
                        limit: 5,
                        offset: parseInt(offset),
                        order: [["likesCount", "DESC"]],
                        include: {
                            model: User,
                            attributes: ["username"]
                        }
                    }
                ]
            })

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            res.status(200).json({post})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
        
    }

    static async getAll(req, res){

        let search = ''
        let offset = 0
        let limit = 5
        let order = "createdAt"
     
        if(req.query.search){
            search = req.query.search
        }

        if(req.query.offset){
            offset = req.query.offset
        }

        if(req.query.limit){
            limit = req.query.limit
        }

        if(req.query.order){
            order = req.query.order
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
                order: [[order, "DESC"]],
                offset: parseInt(offset),
                limit: parseInt(limit)
            });

            res.status(200).json({posts})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async getAllUserPosts(req, res){
        let offset = 0

        if(req.query.offset){
            offset = req.query.offset
        }

        try {
            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            const posts = await Post.findAll({
                where: { 
                    UserId: currentUser.id
                }, 
                include: {
                    model: User,
                    attributes: ["username"]
                }, 
                offset: parseInt(offset),
                limit: 5
            })

            res.status(200).json({posts})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async getAllUserLikedPost(req, res){

        try {
            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            let offset = 0
            let posts;

            if(req.query.offset){
                offset = req.query.offset
            }

            const likes = await Like.findAll({
                where: { 
                    UserId: currentUser.id
                },
                include: {
                    model: Post,
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
                offset: parseInt(offset),
                limit: 5
            })

            posts = likes.map((like) => like.get({plain: true})).map((like) => like.Post).filter((post) => post !== null)

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
            const post = await Post.findByPk(id)

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

            await post.save()

            res.status(200).json({post})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async addAnswersCount(req, res){
        const { id } = req.params

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            post.answersCount++

            await post.save()

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removeAnswersCount(req, res){
        const { id } = req.params

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            post.answersCount--

            await post.save()

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async addLikesCount(req, res){
        const { id } = req.params

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            post.likesCount++

            await post.save()

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removeLikesCount(req, res){
        const { id } = req.params

        try {
            const post = await Post.findByPk(id)

            if(!post){
                res.status(404).json({message: "error/post-not-found"})
                return
            }

            post.likesCount--

            await post.save()

            res.status(204).json({})
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

            res.status(204).json({})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

}