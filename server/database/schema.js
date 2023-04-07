const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
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
  }
});

const Plant = mongoose.model('Plants', plantSchema);

module.exports = { Plant };