import 'package:flutter_bloc/flutter_bloc.dart';
import 'search_event.dart';
import 'search_state.dart';
import '../../domain/usecases/search_movies_usecase.dart';

class SearchBloc extends Bloc<SearchEvent, SearchState> {
  final SearchMoviesUseCase searchMoviesUseCase;

  SearchBloc({required this.searchMoviesUseCase}) : super(SearchInitial()) {
    on<QueryMoviesEvent>(_onQueryMovies);
  }

  void _onQueryMovies(QueryMoviesEvent event, Emitter<SearchState> emit) async {
    if (event.query.isEmpty) {
      emit(SearchInitial());
      return;
    }
    
    emit(SearchLoading());
    final result = await searchMoviesUseCase(event.query);
    
    result.fold(
      (failure) => emit(SearchError(failure)),
      (movies) => emit(SearchLoaded(movies)),
    );
  }
}
