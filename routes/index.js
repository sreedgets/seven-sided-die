var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

/* GET home page. */
router.get('/', productController.getIndex);

module.exports = router;
