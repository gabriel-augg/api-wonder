import User from "../models/User.js";
import bcrypt from 'bcrypt'
import createUserToken from "../helpers/create-user-token.js";

export default class AuthController {
    static async signUp(req, res){
        const { username, email, password, confirmpassword } = req.body
        
        if( !username || !email || !password || !confirmpassword ) {
            res.status(400).json({message: "error/unexpected-error"})
            return
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
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({message: "error/unexpected-error"})
        }

        const user = await User.findOne({where: {email: email}})

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
}