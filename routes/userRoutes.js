const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController'); // Correct case
const { authenticateUser } = require('../tempMiddleware/userMiddleware'); // Correct case for 'middleware'

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user details (protected route)
router.get('/me', authenticateUser, getUserDetails);

module.exports = router;