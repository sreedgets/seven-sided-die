const express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

//Get product list
router.get('/', productController.getProducts);

//TEST FORM
router.get('/test', productController.testFormGet);
router.post('/test', upload.single('image'), productController.testFormPost);

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
router.post('/create', upload.single('productImage'), productController.productCreatePost);

//Post product update
router.post('/:id/edit', upload.single('productImage'), productController.productUpdatePost);

//Get product delete form
router.get('/:id/delete', productController.productDeleteGet);

//Delete product
router.post('/:id/delete', productController.productDeletePost);

module.exports = router;