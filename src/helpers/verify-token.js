import getToken from './get-token.js'

const verifyToken = (req, res, next) => {

    if(!req.headers.authorization){
        res.status(401).json({ message: 'error/access-denied'})
        return
    }

    const token = getToken(req)

    if(!token) {
        res.status(401).json({ message: 'error/access-denied'})
        return
    }

    next()
}

export default verifyToken;