import User from "../models/User.js";
import Follow from "../models/Follow.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class FollowController {

    static async follow(req, res){
        const { id } = req.params;

        try {
            const user = await User.findByPk(id)

            if(!user){
                res.status(404).json({message: "error/user-not-found"})
                return
            }

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            const isFollowed = await Follow.findOne({where: {userId: currentUser.id, followedUserId: user.id}})

            if(isFollowed){
                res.status(401).json({message: "error/user-already-followed"})
                return
            }

            await Follow.create({userId: currentUser.id, followedUserId: user.id})

            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async unfollow(req, res){
        const { id } = req.params;

        try {
            const user = await User.findByPk(id)

            if(!user){
                res.status(404).json({message: "error/user-not-found"})
                return
            }

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            const isFollowed = await Follow.findOne({where: {userId: currentUser.id, followedUserId: user.id}})

            if(!isFollowed){
                res.status(404).json({message: "error/user-not-followed"})
                return
            }

            await Follow.destroy({where: {id: isFollowed.id}})
        
            res.status(204).json({})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async isFollowed(req, res){
        const {id} = req.params

        let status = null

        try {

            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            const isFollowed = await Follow.findOne({where: {userId: currentUser.id, followedUserId: id}})

            status = (isFollowed) ? true : false

            res.status(200).json({status})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

}