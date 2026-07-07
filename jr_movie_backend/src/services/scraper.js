const yts = require('yt-search');
const Movie = require('../models/Movie');

const scrapeYoutubeForMovies = async () => {
  try {
    console.log('Starting YouTube scrape job...');
    const queries = ['full free movies action 2024', 'free movies comedy full hd'];
    
    for (const query of queries) {
      const r = await yts(query);
      const videos = r.videos.slice(0, 5); // Take top 5 from each query
      
      for (const v of videos) {
        // Avoid duplicate inserts
        const existing = await Movie.findOne({ youtubeId: v.videoId });
        if (!existing) {
          const category = query.includes('action') ? 'Trending' : 'Latest';
          await Movie.create({
            title: v.title,
            description: v.description || 'No description available',
            posterUrl: v.thumbnail,
            backdropUrl: v.thumbnail, // fallback
            rating: Math.floor(Math.random() * (10 - 5 + 1) + 5), // Fake rating for demo
            releaseDate: v.ago,
            videoUrl: v.url,
            trailerUrl: v.url, // fallback
            category: category,
            youtubeId: v.videoId,
            director: v.author.name
          });
        }
      }
    }
    console.log('Scrape job completed successfully.');
  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
};

module.exports = { scrapeYoutubeForMovies };
