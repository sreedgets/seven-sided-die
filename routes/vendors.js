const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

//Get vendor list
router.get('/', vendorController.getVendors);

router.get('/create', vendorController.vendorCreateGet);

router.post('/create', vendorController.vendorCreatePost);

router.get('/:id/delete', vendorController.vendorDeleteGet);

router.post('/:id/delete', vendorController.vendorDeletePost);

module.exports = router;