const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res) => {
    customErrorMsg = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }

    return res.status(customErrorMsg.statusCode).json({msg: customErrorMsg.msg})
}

module.exports = errorHandler