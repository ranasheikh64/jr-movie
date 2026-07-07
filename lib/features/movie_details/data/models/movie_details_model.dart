import '../../domain/entities/movie_details_entity.dart';
import '../../../home/data/models/movie_model.dart';

class MovieDetailsModel extends MovieDetailsEntity {
  const MovieDetailsModel({
    required super.id,
    required super.title,
    required super.description,
    required super.posterUrl,
    super.backdropUrl,
    required super.rating,
    super.releaseDate,
    required super.genres,
    required super.director,
    required super.cast,
    required super.trailerUrl,
    required super.videoUrl,
    super.similarMovies,
  });

  factory MovieDetailsModel.fromJson(Map<String, dynamic> json) {
    return MovieDetailsModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      posterUrl: json['poster_url'] ?? '',
      backdropUrl: json['backdrop_url'],
      rating: (json['rating'] ?? 0.0).toDouble(),
      releaseDate: json['release_date'],
      genres: List<String>.from(json['genres'] ?? []),
      director: json['director'] ?? '',
      cast: List<String>.from(json['cast'] ?? []),
      trailerUrl: json['trailer_url'] ?? '',
      videoUrl: json['video_url'] ?? '',
      similarMovies: json['similar_movies'] != null
          ? (json['similar_movies'] as List).map((e) => MovieModel.fromJson(e)).toList()
          : [],
    );
  }
}
