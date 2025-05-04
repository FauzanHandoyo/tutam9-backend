const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes
const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB Fauzan');
});

// Sample Route
app.get('/api/data', (req, res) => {
  res.json({ message: "Connected from backend!" });
});

// User Routes
app.use('/api/users', userRoutes); // Add user routes

// Task Routes
app.use('/api/tasks', taskRoutes); // Add task routes

// Export for Vercel
module.exports = app;