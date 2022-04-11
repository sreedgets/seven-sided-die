const express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

//Get product list
router.get('/', productController.getProducts);

//Get vendor product list
router.get('/vendor/:id', productController.vendorProducts);

//Get category product list
router.get('/category/:id', productController.categoryProducts);

//Get genre product list
router.get('/genre/:id', productController.genreProducts);

//Get product single listing
router.get('/:id', productController.productSingle);

module.exports = router;