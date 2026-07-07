import '../../domain/entities/movie_entity.dart';

class MovieModel extends MovieEntity {
  const MovieModel({
    required super.id,
    required super.title,
    required super.posterUrl,
    super.backdropUrl,
    super.rating = 0.0,
    super.releaseDate,
  });

  factory MovieModel.fromJson(Map<String, dynamic> json) {
    return MovieModel(
      id: json['id'] ?? '',
      title: json['title'] ?? 'Unknown',
      posterUrl: json['poster_url'] ?? '',
      backdropUrl: json['backdrop_url'],
      rating: (json['rating'] ?? 0.0).toDouble(),
      releaseDate: json['release_date'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'poster_url': posterUrl,
      'backdrop_url': backdropUrl,
      'rating': rating,
      'release_date': releaseDate,
    };
  }
}
