const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;
  console.log("hj" + JSON.stringify(req.headers))
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
        console.log("vhjb")
      token = req.headers.authorization.split(' ')[1];
      console.log("t " + token);
      const decoded = jwt.verify(token, 'secret');
      console.log("d " + decoded);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
