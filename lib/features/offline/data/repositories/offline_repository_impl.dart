import 'package:dartz/dartz.dart';
import '../../domain/entities/saved_movie_entity.dart';
import '../../domain/repositories/offline_repository.dart';
import '../datasources/offline_local_datasource.dart';
import '../models/saved_movie_model.dart';

class OfflineRepositoryImpl implements OfflineRepository {
  final OfflineLocalDataSource localDataSource;

  OfflineRepositoryImpl({required this.localDataSource});

  @override
  Future<Either<String, List<SavedMovieEntity>>> getWatchlist() async {
    try {
      final movies = await localDataSource.getWatchlist();
      return Right(movies);
    } catch (e) {
      return Left('Failed to get watchlist: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, void>> addToWatchlist(SavedMovieEntity movie) async {
    try {
      await localDataSource.addToWatchlist(SavedMovieModel.fromEntity(movie));
      return const Right(null);
    } catch (e) {
      return Left('Failed to add to watchlist: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, void>> removeFromWatchlist(String movieId) async {
    try {
      await localDataSource.removeFromWatchlist(movieId);
      return const Right(null);
    } catch (e) {
      return Left('Failed to remove from watchlist: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, List<SavedMovieEntity>>> getDownloads() async {
    try {
      final movies = await localDataSource.getDownloads();
      return Right(movies);
    } catch (e) {
      return Left('Failed to get downloads: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, void>> saveDownload(SavedMovieEntity movie) async {
    try {
      await localDataSource.saveDownload(SavedMovieModel.fromEntity(movie));
      return const Right(null);
    } catch (e) {
      return Left('Failed to save download: ${e.toString()}');
    }
  }

  @override
  Future<Either<String, void>> removeDownload(String movieId) async {
    try {
      await localDataSource.removeDownload(movieId);
      return const Right(null);
    } catch (e) {
      return Left('Failed to remove download: ${e.toString()}');
    }
  }
}
