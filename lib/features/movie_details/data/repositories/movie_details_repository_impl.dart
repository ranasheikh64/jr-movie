import 'package:dartz/dartz.dart';
import '../../domain/entities/movie_details_entity.dart';
import '../../domain/repositories/movie_details_repository.dart';
import '../datasources/movie_details_remote_datasource.dart';

class MovieDetailsRepositoryImpl implements MovieDetailsRepository {
  final MovieDetailsRemoteDataSource remoteDataSource;

  MovieDetailsRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<String, MovieDetailsEntity>> getMovieDetails(String movieId) async {
    try {
      final movieDetails = await remoteDataSource.getMovieDetails(movieId);
      return Right(movieDetails);
    } catch (e) {
      return Left('Failed to fetch movie details: ${e.toString()}');
    }
  }
}
