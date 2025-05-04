const Task = require('../models/taskModel');

// Add a new task
exports.addTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create a new task
        const newTask = new Task({
            user: req.user.id, // Assuming the user is authenticated
            title,
            description,
        });

        await newTask.save();

        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Get task ID from the request parameters
        const userId = req.user.id; // Get user ID from the authenticated user

        // Find and delete the task
        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};