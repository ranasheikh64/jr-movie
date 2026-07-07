import 'package:dartz/dartz.dart';
import '../../domain/entities/movie_entity.dart';
import '../../domain/repositories/movie_repository.dart';
import '../datasources/movie_remote_datasource.dart';

class MovieRepositoryImpl implements MovieRepository {
  final MovieRemoteDataSource remoteDataSource;

  MovieRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<String, List<MovieEntity>>> getFeaturedMovies() async {
    try {
      final movies = await remoteDataSource.getFeaturedMovies();
      return Right(movies);
    } catch (e) {
      return Left('Failed to fetch featured movies: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, List<MovieEntity>>> getTrendingMovies() async {
    try {
      final movies = await remoteDataSource.getTrendingMovies();
      return Right(movies);
    } catch (e) {
      return Left('Failed to fetch trending movies: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, List<MovieEntity>>> getLatestMovies() async {
    try {
      final movies = await remoteDataSource.getLatestMovies();
      return Right(movies);
    } catch (e) {
      return Left('Failed to fetch latest movies: ${e.toString()}');
    }
  }
}
