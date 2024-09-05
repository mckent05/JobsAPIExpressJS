const Job = require("../model/jobs")
const { StatusCodes } = require("http-status-codes")


const getAllJobs = async (req, res) => {
    const { user: { userId } } = req
    const jobs = await Job.find({userId: userId}).sort("createdAt")
    res.status(StatusCodes.OK).json({data: jobs})
}

const createJob = async (req, res) => {
    req.body.userId = req.user.userId
    const job = await Job.create({...req.body})
    res.status(StatusCodes.CREATED).json({job})
}


module.exports = {
    getAllJobs,
    createJob
}