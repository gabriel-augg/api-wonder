import jwt from "jsonwebtoken"

import User from "../models/User.js"

const getUserByToken = async (token) => {

    const decoded = jwt.verify(token, "confidential")
    const user = await User.findByPk(decoded.id, {
        attributes: ["id", "username", "email", "description"]
    })

    return user
}

export default getUserByToken;