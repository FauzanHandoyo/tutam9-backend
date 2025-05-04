const Task = require('../models/taskModel');

// Add a new task
exports.addTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        // Calculate the day of the week
        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

        // Create a new task
        const newTask = new Task({
            user: req.user.id, // Assuming the user is authenticated
            title,
            description,
            date, // Add the date field
            day: dayOfWeek, // Add the day of the week
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

exports.editTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const { title, description, date, completed } = req.body;

        // Calculate the day of the week if the date is provided
        const dayOfWeek = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' }) : undefined;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            { title, description, date, day: dayOfWeek, completed }, // Include the day field
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized to edit' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};