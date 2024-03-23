import User from "../models/User.js";
import bcrypt from 'bcrypt'
import createUserToken from "../helpers/create-user-token.js";

export default class UserController {
    static async signUp(req, res){
        const { name, username, email, password, confirmpassword } = req.body
        
        if( !name || !username || !email || !password || !confirmpassword ) {
            res.status(400).json({message: "error/unexpected-error"})
        }

        const checkIfUsernameIsAvailable = await User.findOne({where: {username: username}})
        const checkIfEmailIsAvailable = await User.findOne({where: {email: email}})

        if(checkIfUsernameIsAvailable){
            res.status(409).json({ message: "error/username-unavailable" })
            return
        }

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

}