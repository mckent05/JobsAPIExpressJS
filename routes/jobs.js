const express = require("express")
const {
    getAllJobs,
    createJob,
    getJob
} = require("../Controllers/jobs")

const routes = express.Router()

routes.route("/").get(getAllJobs).post(createJob)

routes.route("/id").get(getJob)

module.exports = routes