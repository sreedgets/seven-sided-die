const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//Get vendor list
router.get('/', categoryController.getCategories);

module.exports = router;