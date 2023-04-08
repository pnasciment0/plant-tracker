const mongoose = require('mongoose');
require('dotenv').config();

const ptUser = process.env.USERNAME;
const ptPass = process.env.PASSWORD;
const connString = `mongodb+srv://${ptUser}:${ptPass}@planttracker.pcllyya.mongodb.net/PlantData?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
      await mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
module.exports = connectDB;