const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Prevents CORS errors when React tries to talk to Express
app.use(express.json()); // Allows us to parse JSON bodies from frontend requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(function() {
        console.log('Successfully connected to MongoDB');
    })
    .catch(function(err) {
        console.error('Failed to connect to MongoDB', err);
    });

// API Routes
app.use('/api/tasks', taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});