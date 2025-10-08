const Joi = require('joi');

// User registration validation schema
const validateRegistration = (data) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

// User login validation schema
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports = {
    validateRegistration,
    validateLogin
};