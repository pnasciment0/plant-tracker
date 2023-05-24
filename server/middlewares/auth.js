const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const auth = async (req, res, next) => {
  try {
    // Get token from the header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and check if token is still valid
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    
    if (!user) {
      throw new Error();
    }
    
    // Attach user to the request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;