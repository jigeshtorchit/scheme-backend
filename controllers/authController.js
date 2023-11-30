const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path')

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const showScheme = (req, res) => {
  // Render or send the HTML page for the scheme
  const schemePath = path.resolve(__dirname, '../models/scheme.html');
  res.sendFile(schemePath);
};


module.exports = {  login, showScheme };
