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

// exports.getPlantsByUser = async (req, res) => {
//     try {
//         const Users = 
//     }
// }