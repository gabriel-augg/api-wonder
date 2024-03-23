import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        id: user.id
    }, "confidential")

    res.status(201).json({
        message: "Successfully authenticated",
        token: token
    })
}

export default createUserToken;