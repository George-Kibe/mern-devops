const rateLimit = require('express-rate-limit');

const createBasicRateLimiter = (maxrequests, time) => {
    return rateLimit({
        windowMs: time * 60 * 1000, // time in minutes
        max: maxrequests,
        message: 'Too many requests from this IP, please try again later',
        standrdHeaders: true,
        legacyHeaders: false,
    });
}

module.exports = { createBasicRateLimiter };