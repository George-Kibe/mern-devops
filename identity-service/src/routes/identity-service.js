const express = require('express');
const { registerUser } = require('../controllers/identity-controller');

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
// router.post('/login', loginUser);

// Refresh token route
// router.post('/refresh-token', refreshToken);

// Logout route
// router.post('/logout', logoutUser);

module.exports = router;    