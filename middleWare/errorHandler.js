const { StatusCodes } = require('http-status-codes')
const CustomAPI = require('../Error/CustomAPI')

const errorHandler = (err, req, res, next) => {
    customErrorMsg = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }
    if(err instanceof CustomAPI) {
        res.status(err.statusCode).json({msg: err.msg})
    }

   
}

module.exports = errorHandler