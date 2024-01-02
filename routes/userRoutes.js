const { userAdd, userUpdate} = require("../controllers/user");
const express = require('express');
const router = express.Router();

router.post('/userAdd', userAdd);
// router.get('/schemeView',schemeView);
// router.get('/:id', getSchemeById);
// router.delete('/schemeDelete/:id', schemeDelete);
router.patch('/userUpdate/:id', userUpdate); 

module.exports = router;
 