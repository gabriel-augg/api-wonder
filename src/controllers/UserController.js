import User from "../models/User.js";
import bcrypt, { hash } from 'bcrypt'
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

export default class UserController {
    static async signUp(req, res){
        const { name, username, email, password, confirmpassword } = req.body
        
        if( !name || !username || !email || !password || !confirmpassword ) {
            res.status(400).json({message: "error/unexpected-error"})
        }

        const checkIfUsernameIsAvailable = await User.findOne({where: {username: username}})

        if(checkIfUsernameIsAvailable){
            res.status(409).json({ message: "error/username-unavailable" })
            return
        }

        const checkIfEmailIsAvailable = await User.findOne({where: {email: email}})

        if(checkIfEmailIsAvailable){
            res.status(409).json({ message: "error/email-unavailable" })
            return
        }

        if(password !== confirmpassword){
            res.status(400).json({message: "error/password-conflict"})
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = {
            name,
            username,
            email,
            password_hash: hashPassword
        }

        try {
            const createdUser = await User.create(user)
            createUserToken(createdUser, req, res)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }
    }

    static async signIn(req, res){
        const {username, password} = req.body;

        if(!username || !password){
            res.status(400).json({message: "error/unexpected-error"})
        }

        const user = await User.findOne({where: {username: username}})

        if(!user){
            res.status(404).json({message: "error/user-not-found"})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password_hash)

        if(!checkPassword){
            res.status(401).json({message: "error/incorrect-password"})
            return
        }

        try {
            createUserToken(user, req, res)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "error/server-issue"})
        }

    }

    static async checkUser(req, res){
        let currentUser = null

        if(req.headers.authorization){

            const token = getToken(req)

            currentUser = await getUserByToken(token)

            res.status(200).json({user: currentUser})
            return
        }

        res.status(401).json({message: "error/access-denied"})

    }
    
    static async updateUser(req, res){

        if(!req.headers.authorization){
            res.status(401).json({message: "error/access-denied"})
            return
        }

        const { name, username, email, image, password, confirmpassword } = req.body;

        if(!name || !username || !email){
            res.status(400).json({message: "error/unexpected-error"})
            return
        }

        const token = getToken(req)
        const currentUser = await getUserByToken(token)

        const checkIfUsernameIsAvailable = await User.findOne({where: {username: username}})

        currentUser.name = name

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

        if(password){
            if(password !== confirmpassword){
                res.status(400).json({message: "error/password-conflict"})
                return
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            currentUser.password = hashPassword
        }


        res.status(200).json({user: currentUser})


    }
}