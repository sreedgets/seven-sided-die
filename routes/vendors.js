const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

//Get vendor list
router.get('/', vendorController.getVendors);

module.exports = router;