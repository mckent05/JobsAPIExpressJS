const express = require("express")
const {
    getAllJobs,
    createJob
} = require("../Controllers/")

const routes = express.Router()

routes.route("/").get