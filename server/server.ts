// server.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import connectDB from './database/connection';
import plantRoutes from './routes/plantRoutes';
import userRoutes from './routes/userRoutes';

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
