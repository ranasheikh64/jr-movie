import 'package:dartz/dartz.dart';
import 'package:jr_movie/features/home/domain/entities/movie_entity.dart';
import '../repositories/search_repository.dart';

class SearchMoviesUseCase {
  final SearchRepository repository;

  SearchMoviesUseCase(this.repository);

  Future<Either<String, List<MovieEntity>>> call(String query) {
    return repository.searchMovies(query);
  }
}

