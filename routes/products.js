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

//Get product form to create product
router.get('/create', productController.productFormGet);

//Get product single listing
router.get('/:id', productController.productSingle);

//Get product update form
router.get('/:id/edit', productController.productUpdateGet);

//Post new product listing
router.post('/create', productController.productCreatePost);

module.exports = router;