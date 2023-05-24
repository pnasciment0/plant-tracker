import express from 'express';
const locationsController = require('../controllers/locationsController');

const router = express.Router();

// GET /api/locations
router.get('/', locationsController.getLocations);

// GET /api/locations/:id
router.get('/:id', locationsController.getLocationById);

// POST /api/locations
router.post('/', locationsController.addLocation);

// PUT /api/locations/:id
router.put('/:id', locationsController.updateLocationById);

// DELETE /api/locations/:id
router.delete('/:id', locationsController.deleteLocation);

// POST /api/locations/:locationId/plants/:plantId
router.post('/:locationId/plants/:plantId', locationsController.addPlantToLocation);

// DELETE /api/locations/:locationId/plants/:plantId
router.delete('/:locationId/plants/:plantId', locationsController.removePlantFromLocation);

// PUT /api/locations/:sourceLocationId/:targetLocationId/plants/:plantId
router.put('/:sourceLocationId/:targetLocationId/plants/:plantId', locationsController.movePlantToAnotherLocation);

module.exports = router;
