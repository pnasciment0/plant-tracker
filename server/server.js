// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const connectDB = require('./database/connection');
const plantRoutes = require('./routes/plantRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes)

// Start the server
const port = process.env.PORT || 81;
app.listen(port, () => console.log(`Server running on port ${port}`));
