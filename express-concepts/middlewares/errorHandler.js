// custom server error handling middleware

class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'APIError';
    }
}

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // log error stack for debugging
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: 'Error',
            statusCode: err.statusCode,
            message: err.message
        });
    }
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            status: 'Error',
            statusCode: 400,
            message: 'Validation Error',
            errors
        });
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = { APIError, asyncHandler, globalErrorHandler };