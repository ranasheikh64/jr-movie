import 'package:dartz/dartz.dart';
import '../entities/movie_details_entity.dart';
import '../repositories/movie_details_repository.dart';

class GetMovieDetailsUseCase {
  final MovieDetailsRepository repository;

  GetMovieDetailsUseCase(this.repository);

  Future<Either<String, MovieDetailsEntity>> call(String movieId) {
    return repository.getMovieDetails(movieId);
  }
}
