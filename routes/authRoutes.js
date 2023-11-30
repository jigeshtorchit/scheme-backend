const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Registration Endpoint
router.post('/register', authController.register);

// Login Endpoint
router.post('/login', authController.login);

module.exports = router;
