const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    //Mongoose Bad Object Id error
    if (err.name === 'CastError') {
        const message = `Dish with Id ${err.value} not found`;
        error = new ErrorResponse(message, 404);
    }

    //Duplicate Field Value
    if (err.code === 11000) {
        const message = `Duplicate Dish value entered. Can't insert.`;
        error = new ErrorResponse(message, 400);
    }

    //Validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        errorMessage: error.message || 'Server Error',
    });
};

module.exports = errorHandler;
