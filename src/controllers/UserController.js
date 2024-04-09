import User from "../models/User.js";
import bcrypt from 'bcrypt'
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import Answer from "../models/Answer.js";

export default class UserController {

    static async checkUser(req, res){
        
        try {
            const token = getToken(req)
            const currentUser = await getUserByToken(token)

            res.status(200).json({user: currentUser})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/unexpected-error"})
        }

    }

    static async getUserById(req, res){
        const { id } = req.params;
        
        try {
            const user = await User.findByPk(id, {
                include: {
                    model: Answer
                },
                attributes: {
                    exclude: ["password_hash"]
                }
            })

            if(!user){
                res.status(404).json({message: "error/user-not-found"})
                return
            }

            res.status(200).json({user})
        } catch (error) {
            
        }
        
    }

    static async addPostsCount(req, res){
        try {
            const token = getToken(req)
            const user = await getUserByToken(token)

            user.postsCount++

            await user.save()

            res.status(200).json({message: "success/succefully-updated"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removePostsCount(req, res){
        try {
            const token = getToken(req)
            const user = await getUserByToken(token)

            user.postsCount--

            await user.save()

            res.status(200).json({message: "success/succefully-updated"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async addFollowsCount(req, res){
        try {
            const token = getToken(req)
            const user = await getUserByToken(token)

            user.followsCount++

            await user.save()

            res.status(200).json({message: "success/succefully-updated"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async removeFollowsCount(req, res){
        try {
            const token = getToken(req)
            const user = await getUserByToken(token)

            user.followsCount--

            await user.save()

            res.status(200).json({message: "success/succefully-updated"})

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }
    
    static async updateUser(req, res){

        const { username, email, description, password, confirmpassword } = req.body;


        if( !username || !email){
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        const token = getToken(req)
        const currentUser = await getUserByToken(token)

        const checkIfUsernameIsAvailable = await User.findOne({where: {username: username}})

        if(checkIfUsernameIsAvailable && currentUser.username !== username ){
            res.status(409).json({ message: "error/username-unavailable" })
            return
        }

        currentUser.username = username

        const checkIfEmailIsAvailable = await User.findOne({where: {email: email}})

        if(checkIfEmailIsAvailable && currentUser.email !== email){
            res.status(409).json({ message: "error/email-unavailable" })
            return
        }

        currentUser.email = email

        if(description){
            currentUser.description = description
        }

        if(password){
            if(password !== confirmpassword){
                res.status(400).json({message: "error/password-conflict"})
                return
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            currentUser.password_hash = hashPassword
        }

        try {
            await currentUser.save()
            res.status(200).json({ message: "success/successfully-updated" })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error/server-issue" })
        }

    }

}