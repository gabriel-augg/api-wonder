import jwt from "jsonwebtoken"

import User from "../models/User.js"

const getUserByToken = async (token) => {

    const decoded = jwt.verify(token, "450a4f90-5739-440b-8da6-c61b75fbe59f")
    const user = await User.findByPk(decoded.id, {
        attributes: {
            exclude: ["password_hash"]
        }
    })

    return user
}

export default getUserByToken;