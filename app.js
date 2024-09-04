require("dotenv").config()
const express = require("express")
const connectDB = require("./Config/db")
const authRouter = require("./routes/auth")
const errorHandler = require("./middleWare/errorHandler")
const authenticationHandler = require("./middleWare/authenticationHandler")
const app = express()
let connectionString = process.env.MONGO_URI
connectionString = connectionString.replace("<password>", encodeURIComponent(process.env.password))

const PORT = 3000



app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use(errorHandler)


const start = async () => {
    try {
        await connectDB(connectionString)
        app.listen(PORT, () => {
            console.log(`Server is runnning on ${PORT}...`)
        })
    }
    catch(err) {
        console.log(err)
    }
}

start()