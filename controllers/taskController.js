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