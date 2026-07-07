const Movie = require('../models/Movie');
const { redisClient } = require('../config/redis');

// Fetch movies with caching
const getMoviesByCategory = async (req, res, category) => {
  try {
    const cacheKey = `movies_${category}`;
    // Check Redis Cache
    if (redisClient.isOpen) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.json({ data: JSON.parse(cachedData), source: 'cache' });
      }
    }

    // Fetch from MongoDB
    const movies = await Movie.find({ category }).limit(20);
    
    // Save to Redis (Cache for 1 hour)
    if (redisClient.isOpen) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(movies));
    }

    res.json({ data: movies, source: 'db' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeatured = (req, res) => getMoviesByCategory(req, res, 'Featured');
const getTrending = (req, res) => getMoviesByCategory(req, res, 'Trending');
const getLatest = (req, res) => getMoviesByCategory(req, res, 'Latest');

const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ data: [] });

    const cacheKey = `search_${query}`;
    if (redisClient.isOpen) {
      const cached = await redisClient.get(cacheKey);
      if (cached) return res.json({ data: JSON.parse(cached), source: 'cache' });
    }

    const movies = await Movie.find({ title: { $regex: query, $options: 'i' } }).limit(10);
    
    if (redisClient.isOpen) {
      await redisClient.setEx(cacheKey, 600, JSON.stringify(movies)); // Cache search for 10 mins
    }
    
    res.json({ data: movies, source: 'db' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ data: movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeatured,
  getTrending,
  getLatest,
  searchMovies,
  getMovieDetails
};
