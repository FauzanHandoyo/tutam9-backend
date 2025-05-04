const express = require('express');
const { addTask, deleteTask, editTask } = require('../controllers/taskController');
const { authenticateUser } = require('../tempMiddleware/userMiddleware');

const router = express.Router();

// Add a new task (protected route)
router.post('/add', authenticateUser, addTask);
router.delete('/:id' , authenticateUser, deleteTask);
router.put('/:id' , authenticateUser, editTask);
router.get('/', authenticateUser, getTasks);

module.exports = router;