const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

//Get genre list
router.get('/', genreController.getGenres);

router.get('/create', genreController.genreCreateGet);

router.post('/create', genreController.genreCreatePost);

router.get('/:id/delete', genreController.genreDeleteGet);

router.post('/:id/delete', genreController.genreDeletePost);

module.exports = router;