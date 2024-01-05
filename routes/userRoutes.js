const { userAdd, userUpdate} = require("../controllers/user");
const express = require('express');
const router = express.Router();

router.post('/userAdd', userAdd);
router.patch('/userUpdate/:id', userUpdate); 

module.exports = router;
 
