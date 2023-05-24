const { Plant } = require('../models/plantsModel');
import { Request, Response } from 'express';

// ========= GET ==========

exports.getPlants = async (req: Request, res: Response) => {
    try {
      const plants = await Plant.find();
      res.json(plants);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

exports.getPlantById = async (req: Request, res: Response) => {
    try {
      const plant = await Plant.findById(req.params.id);
      if (!plant) {
        return res.status(404).json({ msg: 'Plant not found' });
      }
      res.json(plant);
    } catch (err: any) {
      console.error(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Plant not found' });
      }
      res.status(500).send('Server Error');
    }
};

// exports.getPlantsByUserId = async (req, res) => {

    // TODO

// }

// ========= POST ==========

exports.addPlant = async (req: Request, res: Response) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    res.status(500).send(err);
  }
};

// ========= PUT ==========

exports.updatePlantById = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plant) {
      return res.status(404).send();
    }
    res.json(plant);
  } catch (err) {
    res.status(500).send(err);
  }
}

// ========= DELETE ==========

exports.deletePlant = async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).send();
    }
    res.json(plant);
  } catch (err) {
    res.status(500).send(err);
  }
}