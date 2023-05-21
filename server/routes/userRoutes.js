// server/routes/userRoutes.js

const express = require('express');
const { User } = require('../models/usersModel');
const userController = require('../controllers/userController');

const router = express.Router();

// GET /api/users
router.get('/', userController.getUsers);

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
    res.status(500).json({ message: error.message });
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
    res.status(400).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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

module.exports = router;
