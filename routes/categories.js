const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

//Get vendor list
router.get('/', categoryController.getCategories);

router.get('/create', categoryController.categoryCreateGet);

router.post('/create', categoryController.categoryCreatePost);

router.get('/:id/delete', categoryController.categoryDeleteGet);

router.post('/:id/delete', categoryController.categoryDeletePost);

router.get('/:id/update', categoryController.categoryUpdateGet);

router.post('/:id/update', categoryController.categoryUpdatePost);

module.exports = router;