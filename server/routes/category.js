const express = require('express');
const router = express.Router();

const { createCategory } = require('../controllers/category.js');
const { getCategory } = require('../controllers/showCat.js');


router.post('/', createCategory); //TODO: Add category
router.get('/', getCategory);


module.exports = router;