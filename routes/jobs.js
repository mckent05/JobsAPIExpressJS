const express = require("express")
const {
    getAllJobs,
    createJob
} = require("../Controllers/jobs")

const routes = express.Router()

routes.route("/").get(getAllJobs)

routes.route("/id").post(createJob)

module.exports = routes