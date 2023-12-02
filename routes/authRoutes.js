const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

router.post('/login', authController.login);
router.post('/chat', botController.chatBot);

module.exports = router;
