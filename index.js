const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const cors = require('cors');
const corsOption=require("./cors/cors")
const app = express();
const PORT = process.env.PORT || 3000;
const schemeRoutes = require('./routes/schemeRoutes');

app.use(express.static('public'));
app.use(express.json());
app.use('/admin', authRoutes);
app.use('/scheme', schemeRoutes);
// app.use(cors());
app.use(cors(corsOption)); 

// Check if the connection is not already open before initializing
if (db.readyState !== 1) {
  db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Create an admin user if not exists
    const adminUser = await User.findOne({ email: 'adminawesome@gmail.com' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await User.create({
        firstname: 'Admin',
        lastname: 'Admin',
        username: 'admin',
        email: 'adminawesome@gmail.com',
        password: hashedPassword,
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
