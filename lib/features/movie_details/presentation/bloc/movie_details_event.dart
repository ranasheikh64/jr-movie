import 'package:equatable/equatable.dart';

abstract class MovieDetailsEvent extends Equatable {
  const MovieDetailsEvent();

  @override
  List<Object> get props => [];
}

class FetchMovieDetailsEvent extends MovieDetailsEvent {
  final String movieId;

  const FetchMovieDetailsEvent(this.movieId);

  @override
  List<Object> get props => [movieId];
}
