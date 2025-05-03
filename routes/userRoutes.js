const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

// Register route
router.post('/register', userCtrl.register);

// Login route
router.post('/login', userCtrl.login);

module.exports = router;