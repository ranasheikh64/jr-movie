import 'package:dartz/dartz.dart';
import '../entities/movie_entity.dart';
import '../repositories/movie_repository.dart';

class GetFeaturedMoviesUseCase {
  final MovieRepository repository;

  GetFeaturedMoviesUseCase(this.repository);

  Future<Either<String, List<MovieEntity>>> call() {
    return repository.getFeaturedMovies();
  }
}
