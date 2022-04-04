const express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

//Get product list
router.get('/', productController.getProducts);

//Get product single listing
router.get('/:id', productController.productSingle);

module.exports = router;