const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const path = require('path');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ adminId: admin._id, email: admin.email }, secretKey, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful!', token, email, firstname: admin.firstname, lastname: admin.lastname });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login };