const { Plant } = require('../models/plantsModel');

exports.getPlants = async (req, res) => {
    try {
      const plants = await Plant.find();
      res.json(plants);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };