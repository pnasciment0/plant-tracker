import mongoose from 'mongoose';
require('dotenv').config();

const ptUser = process.env.USERNAME;
const ptPass = process.env.PASSWORD;
const connString = `mongodb+srv://${ptUser}:${ptPass}@planttracker.pcllyya.mongodb.net/PlantData?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
      await mongoose.connect(connString, {
        useUnifiedTopology: true,
      } as any);
      console.log('MongoDB connected...');
    } catch (err) {
      const message = (err as Error).message;
      console.error(message);
      process.exit(1);
    }
  };
  
export default connectDB;