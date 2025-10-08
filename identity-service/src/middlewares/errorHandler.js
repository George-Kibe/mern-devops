const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    logger.error(err.message, { stack: err.stack });
    res.status( err.status || 500).json({ 
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred'
    });
}

module.exports = errorHandler;