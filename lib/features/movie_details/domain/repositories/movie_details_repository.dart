import 'package:dartz/dartz.dart';
import '../entities/movie_details_entity.dart';

abstract class MovieDetailsRepository {
  Future<Either<String, MovieDetailsEntity>> getMovieDetails(String movieId);
}
