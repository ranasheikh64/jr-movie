const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  posterUrl: { type: String },
  backdropUrl: { type: String },
  rating: { type: Number, default: 0 },
  releaseDate: { type: String },
  genres: [String],
  director: { type: String },
  cast: [String],
  trailerUrl: { type: String },
  videoUrl: { type: String },
  category: { type: String, enum: ['Featured', 'Trending', 'Latest', 'Popular'], default: 'Latest' },
  youtubeId: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
