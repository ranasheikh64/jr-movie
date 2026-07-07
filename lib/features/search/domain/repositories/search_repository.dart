import 'package:dartz/dartz.dart';
import 'package:jr_movie/features/home/domain/entities/movie_entity.dart';

abstract class SearchRepository {
  Future<Either<String, List<MovieEntity>>> searchMovies(String query);
}

