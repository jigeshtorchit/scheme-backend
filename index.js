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
const bodyParser = require('body-parser');
const { filterFacilities } = require('./controllers/filterFacility'); 

app.use((req, res, next) => {
  console.log('Request headers:', req.headers);
  console.log('CORS headers:', res.getHeaders());
  next();
});

app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsOption)); 

app.use('/admin', authRoutes);
app.use('/scheme', schemeRoutes);
app.use(bodyParser.json());

app.get('/filterFacilities', async (req, res) => {
  await filterFacilities(req, res);
});

if (db.readyState !== 1) {
  db.once('open', async () => {
    console.log('Connected to MongoDB');

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
