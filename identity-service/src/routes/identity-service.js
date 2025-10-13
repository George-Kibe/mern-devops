const express = require('express');
const { registerUser, loginUser, refreshUserToken, logoutUser } = require('../controllers/identity-controller');

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Refresh token route
router.post('/refresh-token', refreshUserToken);

// Logout route
router.post('/logout', logoutUser);

module.exports = router;    