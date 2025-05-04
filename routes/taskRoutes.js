const express = require('express');
const { addTask, deleteTask } = require('../controllers/taskController');
const { authenticateUser } = require('../tempMiddleware/userMiddleware');

const router = express.Router();

// Add a new task (protected route)
router.post('/add', authenticateUser, addTask);
router.delete('/:id' , authenticateUser, deleteTask);

module.exports = router;