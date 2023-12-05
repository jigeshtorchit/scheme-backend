const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const cors = require('cors');
const corsOption = require("./cors/cors");
const app = express();
const PORT = process.env.PORT || 3000;
const schemeRoutes = require('./routes/schemeRoutes');
const mongoose = require('mongoose');
const { filterFacilities  } = require('./controllers/filterFacility');
const botRoutes = require('./routes/authRoutes');
const QA = require('./models/bot'); // Import the model for Q&A pairs

app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOption));
app.use('/admin', authRoutes);
app.use('/scheme', schemeRoutes);
app.post('/filterFacilities', async (req, res) => {
  await filterFacilities(req, res);
});

// app.get('/facilities', getAllFacilities);

app.use('/api', botRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Check if the connection is not already open before initializing
if (db.readyState !== 1) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Create an admin user if not exists
    const adminUser = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await User.create({
        firstname: 'Admin',
        lastname: 'Admin',
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
      });
    }

    // Insert default Q&A pairs into the database
    const defaultQAPairs = [
      { question: 'How many schemes do you have?', answer: 'We have 172 schemes in our database. You can select which one suits you.' },
      { question: 'How many schemes do you have for females?', answer: 'We have more than 6 schemes for females.' },
      { question: 'What is the minimum age limit on your schemes?', answer: 'The minimum age limit is 1 year.' },
    ];

    try {
      await QA.insertMany(defaultQAPairs);
      console.log('Default Q&A pairs inserted successfully.');
    } catch (error) {
      console.error('Error inserting default Q&A pairs:', error);
    }
  });
}
