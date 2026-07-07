import 'package:equatable/equatable.dart';
import '../../domain/entities/saved_movie_entity.dart';

abstract class OfflineState extends Equatable {
  const OfflineState();

  @override
  List<Object> get props => [];
}

class OfflineInitial extends OfflineState {}

class OfflineLoading extends OfflineState {}

class WatchlistLoaded extends OfflineState {
  final List<SavedMovieEntity> movies;
  const WatchlistLoaded(this.movies);
  @override
  List<Object> get props => [movies];
}

class DownloadsLoaded extends OfflineState {
  final List<SavedMovieEntity> movies;
  const DownloadsLoaded(this.movies);
  @override
  List<Object> get props => [movies];
}

class OfflineError extends OfflineState {
  final String message;
  const OfflineError(this.message);
  @override
  List<Object> get props => [message];
}

class OfflineSuccess extends OfflineState {
  final String message;
  const OfflineSuccess(this.message);
  @override
  List<Object> get props => [message];
}
