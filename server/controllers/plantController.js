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

  exports.getPlantById = async (req, res) => {
    try {
      const plant = await Plant.findById(req.params.id);
      if (!plant) {
        return res.status(404).json({ msg: 'Plant not found' });
      }
      res.json(plant);
    } catch (err) {
      console.error(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Plant not found' });
      }
      res.status(500).send('Server Error');
    }
  };