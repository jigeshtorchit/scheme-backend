const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful!', token, email, firstname: user.firstname, lastname: user.lastname });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login };