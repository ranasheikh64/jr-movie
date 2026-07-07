import 'package:equatable/equatable.dart';
import 'package:jr_movie/features/home/domain/entities/movie_entity.dart';

class MovieDetailsEntity extends Equatable {
  final String id;
  final String title;
  final String description;
  final String posterUrl;
  final String? backdropUrl;
  final double rating;
  final String? releaseDate;
  final List<String> genres;
  final String director;
  final List<String> cast;
  final String trailerUrl;
  final String videoUrl;
  final List<MovieEntity> similarMovies;

  const MovieDetailsEntity({
    required this.id,
    required this.title,
    required this.description,
    required this.posterUrl,
    this.backdropUrl,
    required this.rating,
    this.releaseDate,
    required this.genres,
    required this.director,
    required this.cast,
    required this.trailerUrl,
    required this.videoUrl,
    this.similarMovies = const [],
  });

  @override
  List<Object?> get props => [
        id,
        title,
        description,
        posterUrl,
        backdropUrl,
        rating,
        releaseDate,
        genres,
        director,
        cast,
        trailerUrl,
        videoUrl,
        similarMovies,
      ];
}

