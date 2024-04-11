import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        id: user.id
    }, "450a4f90-5739-440b-8da6-c61b75fbe59f", )

    res.status(200).json({
        token
    })
}

export default createUserToken;