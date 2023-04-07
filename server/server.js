// server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const plantRoutes = require('./routes/plants');

const app = express();

const ptUser = process.env.USERNAME;
const ptPass = process.env.PASSWORD;

const connString = `mongodb+srv://${ptUser}:${ptPass}@planttracker.pcllyya.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(connString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/plants', plantRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
