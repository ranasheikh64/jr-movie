import 'package:dartz/dartz.dart';
import '../entities/saved_movie_entity.dart';

abstract class OfflineRepository {
  Future<Either<String, List<SavedMovieEntity>>> getWatchlist();
  Future<Either<String, void>> addToWatchlist(SavedMovieEntity movie);
  Future<Either<String, void>> removeFromWatchlist(String movieId);

  Future<Either<String, List<SavedMovieEntity>>> getDownloads();
  Future<Either<String, void>> saveDownload(SavedMovieEntity movie);
  Future<Either<String, void>> removeDownload(String movieId);
}
