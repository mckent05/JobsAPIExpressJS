const { BadRequestError, NotfoundError } = require("../Error")
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

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId} } = req
    const job = await Job.findOne({
        _id: jobId,
        userId
    })
    res.status(StatusCodes.OK).json({data: job})
}

const updateJob = async(req, res) => {
    const { user: { userId }, params: { id: jobId}, body: {company, position } } = req
    
    if( company === "" || position === "") {
        throw BadRequestError('Please add a value for both company and position')
    }
    const foundJob = await Job.findByIdAndUpdate({
       _id: jobId, userId
    }, req.body, {runValidators: true, new: true }
    )
    if(!foundJob) {
        throw NotfoundError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({data: foundJob})
}


module.exports = {
    getAllJobs,
    createJob,
    getJob
}