const logger = require('../utils/logger');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const { validateRegistration } = require('../utils/validation');
const generateTokens = require('../utils/generateTokens');
const { log } = require('winston');

// user registration
const registerUser = async (req, res) => {
    logger.info('Registering new user, Register endpoint hit...');
    const { username, email, password } = req.body;
    try {
        // validate the schema
        const { error } = validateRegistration(req.body);
        if (error) {
            logger.error('Validation error during registration: %s', error.details[0].message);
            return res.status(400).json({ 
                success: false,
                message: error.details[0].message 
            });
        }
        let existingUser = await User.findOne({ $or : [{email}, {username}] });
        if (existingUser) {
            logger.error('User already exists');
            return res.status(400).json({
                success: false,
                message: 'User with this Username or email already exists!'
            });
        }

        const user = await User.create({ username, email, password });
        const { accessToken, refreshToken } = await generateTokens(user);
        res.status(201).json({
            success: true,
            message: 'User registered successfully', 
            user,
            accessToken,
            refreshToken
        });
    } catch (error) {
        logger.error('Error during user registration: %s', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Registration failed. Internal server error.' 
        });
    }
};

// user login


// refresh token


// logout


module.exports = {
    registerUser,
    // loginUser,
    // refreshToken,
    // logoutUser
};