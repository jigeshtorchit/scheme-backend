const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone: { type: String, required: true},
  rating: { type: Number},
  comments: { type: String},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
