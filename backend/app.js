// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Donation Campaign API is running');
});

module.exports = app;
