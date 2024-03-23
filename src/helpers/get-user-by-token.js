import jwt from "jsonwebtoken"

import User from "../models/User.js"

const getUserByToken = async (token) => {

    const decoded = jwt.verify(token, "confidential")
    const user = await User.findByPk(decoded.id, {raw: true, attributes: {
        exclude: ['password_hash']
    }})

    return user
}

export default getUserByToken;