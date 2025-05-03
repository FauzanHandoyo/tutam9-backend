// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Export for Vercel
module.exports = app;