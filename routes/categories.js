const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//Get vendor list
router.get('/', categoryController.getCategories);

router.get('/create', categoryController.categoryCreateGet);

router.post('/create', categoryController.categoryCreatePost);

router.get('/:id/delete', categoryController.categoryDeleteGet);

router.post('/:id/delete', categoryController.categoryDeletePost);

module.exports = router;