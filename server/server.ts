// server.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const helmet = require('helmet');
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import connectDB from './database/connection';
import plantRoutes from './routes/plantRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Helmet can help protect your app from some well-known
// web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:8081',  // replace with your client domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // This is important.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes)

// Start the server
const port = process.env.PORT || 81;
app.listen(port, () => console.log(`Server running on port ${port}`));
