const { User } = require('../models/usersModel');

exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

  // ========= ADD/REMOVE LOCATION ==========

exports.addLocationToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const location = await Location.findById(req.params.locationId);
    if (!user || !location) {
      return res.status(404).send();
    }
    user.locations.push(location);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.removeLocationFromUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const location = await Location.findById(req.params.locationId);
    if (!user || !location) {
      return res.status(404).send();
    }
    user.locations.pull(location);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

// ========= ADD/REMOVE PLANT ==========

exports.addPlantToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const plant = await Plant.findById(req.params.plantId);
    if (!user || !plant) {
      return res.status(404).send();
    }
    user.plants.push(plant);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.removePlantFromUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const plant = await Plant.findById(req.params.plantId);
    if (!user || !plant) {
      return res.status(404).send();
    }
    user.plants.pull(plant);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

// exports.getPlantsByUser = async (req, res) => {
//     try {
//         const Users = 
//     }
// }