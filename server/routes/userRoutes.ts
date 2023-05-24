// server/routes/userRoutes.js

import express from 'express';
const { User } = require('../models/usersModel');
const userController = require('../controllers/userController');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Create a new user
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
],  userController.register);

// GET /api/users
router.get('/', userController.getUsers);

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    const message = (error as Error).message;
    res.status(400).json({ message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    const message = (error as Error).message;
    res.status(500).json({ message });
  }
});

// ... existing routes ...

// POST /api/users/:userId/locations/:locationId
router.post('/:userId/locations/:locationId', userController.addLocationToUser);

// DELETE /api/users/:userId/locations/:locationId
router.delete('/:userId/locations/:locationId', userController.removeLocationFromUser);

// POST /api/users/:userId/plants/:plantId
router.post('/:userId/plants/:plantId', userController.addPlantToUser);

// DELETE /api/users/:userId/plants/:plantId
router.delete('/:userId/plants/:plantId', userController.removePlantFromUser);

export default router;
