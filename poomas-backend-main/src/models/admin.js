const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'user'], default: 'user' } ,// Add a field for user role
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
