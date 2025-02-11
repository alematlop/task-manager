const { CustomAPIError } = require('../errors/customError');

const errorHandlerMiddleware = (err, req, res, next) => {

    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json('Something went wrong, try again later');
}

module.exports = errorHandlerMiddleware;