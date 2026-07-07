import 'package:flutter_bloc/flutter_bloc.dart';
import 'movie_details_event.dart';
import 'movie_details_state.dart';
import '../../domain/usecases/get_movie_details_usecase.dart';

class MovieDetailsBloc extends Bloc<MovieDetailsEvent, MovieDetailsState> {
  final GetMovieDetailsUseCase getMovieDetailsUseCase;

  MovieDetailsBloc({required this.getMovieDetailsUseCase}) : super(MovieDetailsInitial()) {
    on<FetchMovieDetailsEvent>(_onFetchMovieDetails);
  }

  void _onFetchMovieDetails(FetchMovieDetailsEvent event, Emitter<MovieDetailsState> emit) async {
    emit(MovieDetailsLoading());

    final result = await getMovieDetailsUseCase(event.movieId);

    result.fold(
      (failure) => emit(MovieDetailsError(failure)),
      (movieDetails) => emit(MovieDetailsLoaded(movieDetails)),
    );
  }
}
