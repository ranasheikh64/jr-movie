import 'package:equatable/equatable.dart';
import '../../domain/entities/saved_movie_entity.dart';

abstract class OfflineEvent extends Equatable {
  const OfflineEvent();

  @override
  List<Object> get props => [];
}

class FetchWatchlistEvent extends OfflineEvent {}

class AddToWatchlistEvent extends OfflineEvent {
  final SavedMovieEntity movie;
  const AddToWatchlistEvent(this.movie);
  @override
  List<Object> get props => [movie];
}

class RemoveFromWatchlistEvent extends OfflineEvent {
  final String movieId;
  const RemoveFromWatchlistEvent(this.movieId);
  @override
  List<Object> get props => [movieId];
}

class FetchDownloadsEvent extends OfflineEvent {}

class SaveDownloadEvent extends OfflineEvent {
  final SavedMovieEntity movie;
  const SaveDownloadEvent(this.movie);
  @override
  List<Object> get props => [movie];
}

class RemoveDownloadEvent extends OfflineEvent {
  final String movieId;
  const RemoveDownloadEvent(this.movieId);
  @override
  List<Object> get props => [movieId];
}
