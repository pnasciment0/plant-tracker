import { User } from '../models/usersModel';
import { Location } from '../models/locationsModel';
import { Plant } from '../models/plantsModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

export const getAuthUser = async (req: Request, res: Response) => {
  console.log("Hi get auth user");
// req.user is assigned in the authMiddleware
// Assuming that user in req.user only contains the user's ID at this stage
  if (!res.locals.user) {
    res.status(401).send({ error: 'Not authorized' });
    return;
  }
  
  try {
    const user = await User.findById(res.locals.user.id).select('-password');
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.send({ data: user });
    }
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
};

// Registration function
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // check if user already exists
  let user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user with all the parameters from the request body
  user = new User({
    ...req.body,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ msg: 'User registered' });
};

  // Login function
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: 'Invalid user credentials' });
  }

  // validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid password credentials' });
  }

  // generate jwt
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);

  // save token in user model
  user.tokens.push({ token });
  await user.save();

  console.log("SUCCESSFUL LOGIN, User: " + username);

  res.cookie('token', token, { httpOnly: true, maxAge: 3600000});
  res.sendStatus(200);
};

export const logout = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    user.tokens = user.tokens.filter((token: any) => {
        return token.token !== req.cookies.token;
    });
    await user.save();

    res.send({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).send({ error: 'Logout failed, please try again.' });
  }
}

  // ========= ADD/REMOVE LOCATION ==========

export const addLocationToUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const location = await Location.findById(req.params.locationId);
    if (!user || !location) {
      return res.status(404).send();
    }
    user.locations.push(location._id);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const removeLocationFromUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const location = await Location.findById(req.params.locationId);
    if (!user || !location) {
      return res.status(404).send();
    }
    user.locations = user.locations.filter(locationId => !locationId.equals(location._id));
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

// ========= ADD/REMOVE PLANT ==========

export const addPlantToUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const plant = await Plant.findById(req.params.plantId);
    if (!user || !plant) {
      return res.status(404).send();
    }
    user.plants.push(plant._id);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export const removePlantFromUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const plant = await Plant.findById(req.params.plantId);
    if (!user || !plant) {
      return res.status(404).send();
    }
    user.plants = user.plants.filter(plantId => !plantId.equals(plant._id));
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

// export const getPlantsByUser = async (req, res) => {
//     try {
//         const Users = 
//     }
// }