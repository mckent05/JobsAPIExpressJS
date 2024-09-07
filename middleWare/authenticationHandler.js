const jwt = require("jsonwebtoken")
const { UnAuthenticatedError } = require("../Error")


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError("No token provided")
    }
    const token = authHeader.split(" ")[1]
    console.log(token)
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: payload.userId,
            name: payload.name
        }
        next()
    }
    catch(err) {
        throw new UnAuthenticatedError("Inavlid token")

    }
}

module.exports = auth