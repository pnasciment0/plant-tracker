// routes/plants.js

const express = require('express');
const { Plant } = require('../models/plantsModel');

const router = express.Router();

// GET /api/plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find().lean()
        .catch((err) => {
            console.log('Error while querying plants:', err);
        });
    res.json(plants);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// POST /api/plants
router.post('/', async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT /api/plants/:id
router.put('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plant) {
      return res.status(404).send();
    }
    res.json(plant);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE /api/plants/:id
router.delete('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).send();
    }
    res.json(plant);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
