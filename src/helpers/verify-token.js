import jwt from "jsonwebtoken"
import getToken from "./get-token.js"

const verifyToken = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).json({
             message: 'error/access-denied'
        })
    }

    const token = getToken(req)

    if(!token) {
        return res.status(401).json({ 
            message: 'error/access-denied'
        })
    }

    try {
        jwt.verify(token, "450a4f90-5739-440b-8da6-c61b75fbe59f")
        return next()
    } catch (error) {
        console.log
        return res.status(401).json({
            message: "error/invalid-token"
        })
    }
}

export default verifyToken;