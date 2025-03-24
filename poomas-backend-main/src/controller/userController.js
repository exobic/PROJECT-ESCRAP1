const User = require('../models/admin');

// Get all users
exports.getUsers = async (req, res) => {
  console.log("user:",req.user)
  try {
    // Check if user is admin
    if (req.user && req.user.role === 'admin') {
      const users = await User.find().select('-password');
      res.json(users);
    } else {
      res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
