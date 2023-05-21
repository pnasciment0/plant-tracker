const { Location } = require('../models/locationsModel');
const { Plant } = require('../models/plantsModel');
const { User } = require('../models/usersModel');

// ========= GET ==========

exports.getLocations = async (req, res) => {
    try {
      const locations = await Location.find().populate('plants');
      res.json(locations);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
};

exports.getLocationById = async (req, res) => {
    try {
      const location = await Location.findById(req.params.id).populate('plants');
      if (!location) {
        return res.status(404).json({ msg: 'Location not found' });
      }
      res.json(location);
    } catch (err) {
      console.error(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Location not found' });
      }
      res.status(500).send('Server Error');
    }
};

// ========= POST ==========

exports.addLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(500).send(err);
  }
};

// ========= PUT ==========

exports.updateLocationById = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) {
      return res.status(404).send();
    }
    res.json(location);
  } catch (err) {
    res.status(500).send(err);
  }
}

// ========= DELETE ==========

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).send();
    }
    res.json(location);
  } catch (err) {
    res.status(500).send(err);
  }
}

// ========= ADD/REMOVE PLANT ==========

exports.addPlantToLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    const plant = await Plant.findById(req.params.plantId);
    if (!location || !plant) {
      return res.status(404).send();
    }
    location.plants.push(plant);
    await location.save();
    res.json(location);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.removePlantFromLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    const plant = await Plant.findById(req.params.plantId);
    if (!location || !plant) {
      return res.status(404).send();
    }
    location.plants.pull(plant);
    await location.save();
    res.json(location);
  } catch (err) {
    res.status(500).send(err);
  }
}

// ========= MOVE PLANT ==========

exports.movePlantToAnotherLocation = async (req, res) => {
  try {
    const sourceLocation = await Location.findById(req.params.sourceLocationId);
    const targetLocation = await Location.findById(req.params.targetLocationId);
    const plant = await Plant.findById(req.params.plantId);
    if (!sourceLocation || !targetLocation || !plant) {
      return res.status(404).send();
    }
    sourceLocation.plants.pull(plant);
    targetLocation.plants.push(plant);
    await sourceLocation.save();
    await targetLocation.save();
    res.json({ sourceLocation, targetLocation });
  } catch (err) {
    res.status(500).send(err);
  }
}
