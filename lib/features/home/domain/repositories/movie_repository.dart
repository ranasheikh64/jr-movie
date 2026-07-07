import 'package:dartz/dartz.dart';
import '../entities/movie_entity.dart';

abstract class MovieRepository {
  Future<Either<String, List<MovieEntity>>> getFeaturedMovies();
  Future<Either<String, List<MovieEntity>>> getTrendingMovies();
  Future<Either<String, List<MovieEntity>>> getLatestMovies();
}
