import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        id: user.id
    }, "confidential")

    res.status(200).json({
        message: "success/authenticated",
        token: token
    })
}

export default createUserToken;