const { schemeAdd, schemeEdit, schemeView, schemeDelete } = require("../controllers/schemeController");
const express = require('express');
const router = express.Router();

router.post('/schemeAdd',schemeAdd);
router.get('/schemeView',schemeView);
router.delete('/schemeDelete/:id', schemeDelete);
router.patch('/schemeEdit/:id', schemeEdit); 

module.exports = router;
 