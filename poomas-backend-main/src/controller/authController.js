const bcrypt = require('bcryptjs');
const User = require('../models/admin');
// Backend (Node.js with Express)
require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
  try {
    const { username, mobileNumber, password, role } = req.body;
    
    // Check if mobile number is already registered
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
    // Create new user with hashed password
    const user = new User({ username, mobileNumber, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const userLogin = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    console.log(req.body);
    // Find user by mobile number
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate JWT token with 1 month expiration
    const token = jwt.sign({ userId: user._id, role: user.role ,username:user.username}, process.env.JWT_SECRET_KEY, { expiresIn: '120d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { userSignup ,userLogin };
