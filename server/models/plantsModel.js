const mongoose = require('mongoose');
const schema = mongoose.Schema;

const { User } = require('../models/usersModel');

const plantSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  species: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  wateringFrequency: {
    type: Number,
    required: true
  },
  lastWatered: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  fertilizerFrequency: {
    type: Number
  },
  lastFertilized: {
    type: Date
  },
  potSize: {
    type: Number
  },
  pottedOn: {
    type: Date
  },
  soilMix: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
      type: Date,
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = { Plant };