// routes/plants.js

const express = require('express');
const plantController = require('../controllers/plantController');

const router = express.Router();

// GET /api/plants
router.get('/', plantController.getPlants);

// GET /api/plants/:id
router.get('/:id', plantController.getPlantById);

// POST /api/plants
router.post('/', plantController.addPlant);

// PUT /api/plants/:id
router.put('/:id', plantController.updatePlantById);

// DELETE /api/plants/:id
router.delete('/:id', plantController.deletePlant);

module.exports = router;
