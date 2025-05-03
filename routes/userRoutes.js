// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const userMiddleware = require('../middleware/userMiddleware');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

// Contoh route proteksi
router.get('/me', userMiddleware.protect, (req, res) => {
  res.json({ message: 'You are logged in!', userId: req.user });
});

module.exports = router;