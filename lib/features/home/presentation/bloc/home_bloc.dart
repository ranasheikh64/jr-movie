import 'package:flutter_bloc/flutter_bloc.dart';
import 'home_event.dart';
import 'home_state.dart';
import '../../domain/repositories/movie_repository.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final MovieRepository movieRepository;

  HomeBloc({required this.movieRepository}) : super(HomeInitial()) {
    on<FetchHomeDataEvent>(_onFetchHomeData);
  }

  void _onFetchHomeData(FetchHomeDataEvent event, Emitter<HomeState> emit) async {
    emit(HomeLoading());

    final featuredResult = await movieRepository.getFeaturedMovies();
    final trendingResult = await movieRepository.getTrendingMovies();
    final latestResult = await movieRepository.getLatestMovies();

    // In a real app, you would handle each failure. For simplicity, we check if all succeed.
    if (featuredResult.isRight() && trendingResult.isRight() && latestResult.isRight()) {
      final featured = featuredResult.getOrElse(() => []);
      final trending = trendingResult.getOrElse(() => []);
      final latest = latestResult.getOrElse(() => []);

      emit(HomeLoaded(
        featuredMovies: featured,
        trendingMovies: trending,
        latestMovies: latest,
      ));
    } else {
      emit(const HomeError('Failed to load home data. Please try again.'));
    }
  }
}
