const express = require('express');
const router = express.Router();
const { getFeatured, getTrending, getLatest, searchMovies, getMovieDetails } = require('../controllers/movieController');

router.get('/featured', getFeatured);
router.get('/trending', getTrending);
router.get('/latest', getLatest);
router.get('/search', searchMovies);
router.get('/:id', getMovieDetails);

module.exports = router;
