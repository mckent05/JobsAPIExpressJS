const { UnAuthenticatedError, BadRequestError } = require("../Error")
const User = require("../model/user")
const { StatusCodes } = require('http-status-codes')


const register = async ( req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status( StatusCodes.OK).json({token})
}

const login = async(req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        throw new BadRequestError("Please provide username and password")
    }
    const user = await User.findOne({email})
    const isPasswordMatch = await user.comparePassword(password)
    if(!user || !isPasswordMatch) {
        throw new UnAuthenticatedError("Invalid Credentials")
    }
    const token = user.createJWT()
    res.status( StatusCodes.OK).json({token})
}

module.exports = {
    login, register
}