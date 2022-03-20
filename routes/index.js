const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', productController.getIndex);

module.exports = router;
