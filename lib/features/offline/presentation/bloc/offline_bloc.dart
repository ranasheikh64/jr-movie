import 'package:flutter_bloc/flutter_bloc.dart';
import 'offline_event.dart';
import 'offline_state.dart';
import '../../domain/repositories/offline_repository.dart';

class OfflineBloc extends Bloc<OfflineEvent, OfflineState> {
  final OfflineRepository repository;

  OfflineBloc({required this.repository}) : super(OfflineInitial()) {
    on<FetchWatchlistEvent>(_onFetchWatchlist);
    on<AddToWatchlistEvent>(_onAddToWatchlist);
    on<RemoveFromWatchlistEvent>(_onRemoveFromWatchlist);
    on<FetchDownloadsEvent>(_onFetchDownloads);
    on<SaveDownloadEvent>(_onSaveDownload);
    on<RemoveDownloadEvent>(_onRemoveDownload);
  }

  void _onFetchWatchlist(FetchWatchlistEvent event, Emitter<OfflineState> emit) async {
    emit(OfflineLoading());
    final result = await repository.getWatchlist();
    result.fold(
      (failure) => emit(OfflineError(failure)),
      (movies) => emit(WatchlistLoaded(movies)),
    );
  }

  void _onAddToWatchlist(AddToWatchlistEvent event, Emitter<OfflineState> emit) async {
    emit(OfflineLoading());
    final result = await repository.addToWatchlist(event.movie);
    result.fold(
      (failure) => emit(OfflineError(failure)),
      (_) => emit(const OfflineSuccess('Added to Watchlist')),
    );
    add(FetchWatchlistEvent()); // Refresh list
  }

  void _onRemoveFromWatchlist(RemoveFromWatchlistEvent event, Emitter<OfflineState> emit) async {
    emit(OfflineLoading());
    final result = await repository.removeFromWatchlist(event.movieId);
    result.fold(
      (failure) => emit(OfflineError(failure)),
      (_) => emit(const OfflineSuccess('Removed from Watchlist')),
    );
    add(FetchWatchlistEvent()); // Refresh list
  }

  void _onFetchDownloads(FetchDownloadsEvent event, Emitter<OfflineState> emit) async {
    emit(OfflineLoading());
    final result = await repository.getDownloads();
    result.fold(
      (failure) => emit(OfflineError(failure)),
      (movies) => emit(DownloadsLoaded(movies)),
    );
  }

  void _onSaveDownload(SaveDownloadEvent event, Emitter<OfflineState> emit) async {
    emit(OfflineLoading());
    final result = await repository.saveDownload(event.movie);
    result.fold(
      (failure) => emit(OfflineError(failure)),
      (_) => emit(const OfflineSuccess('Download saved')),
    );
    add(FetchDownloadsEvent()); // Refresh list
  }

  void _onRemoveDownload(RemoveDownloadEvent event, Emitter<OfflineState> emit) async {
    emit(OfflineLoading());
    final result = await repository.removeDownload(event.movieId);
    result.fold(
      (failure) => emit(OfflineError(failure)),
      (_) => emit(const OfflineSuccess('Download removed')),
    );
    add(FetchDownloadsEvent()); // Refresh list
  }
}
