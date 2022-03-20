const express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

//Get product list
router.get('/', productController.getProducts);

module.exports = router;