require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const movieRoutes = require('./routes/movieRoutes');
const { scrapeYoutubeForMovies } = require('./services/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/movies', movieRoutes);
// Placeholder Auth Route
app.post('/v1/auth/login', (req, res) => res.json({ user: { id: '1', name: 'User', email: req.body.email } }));

// Initialize App
const startServer = async () => {
  await connectDB();
  await connectRedis();

  // Run Scraper initially (Comment this out in production if you only want cron)
  await scrapeYoutubeForMovies();

  // Cron Job to scrape everyday at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled scraping job...');
    await scrapeYoutubeForMovies();
  });

  app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
  });
};

startServer();
