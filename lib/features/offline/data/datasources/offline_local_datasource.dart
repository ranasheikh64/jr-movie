import 'dart:convert';
import 'package:jr_movie/core/utils/local_storage_manager.dart';
import '../models/saved_movie_model.dart';

abstract class OfflineLocalDataSource {
  Future<List<SavedMovieModel>> getWatchlist();
  Future<void> addToWatchlist(SavedMovieModel movie);
  Future<void> removeFromWatchlist(String movieId);

  Future<List<SavedMovieModel>> getDownloads();
  Future<void> saveDownload(SavedMovieModel movie);
  Future<void> removeDownload(String movieId);
}

class OfflineLocalDataSourceImpl implements OfflineLocalDataSource {
  static const String _watchlistKey = 'WATCHLIST_KEY';
  static const String _downloadsKey = 'DOWNLOADS_KEY';
  static const String _boxName = 'offline_box';

  @override
  Future<List<SavedMovieModel>> getWatchlist() async {
    final data = await LocalStorageManager.getData(key: _watchlistKey, boxName: _boxName);
    if (data != null) {
      final List decoded = json.decode(data);
      return decoded.map((e) => SavedMovieModel.fromJson(e)).toList();
    }
    return [];
  }

  @override
  Future<void> addToWatchlist(SavedMovieModel movie) async {
    final currentList = await getWatchlist();
    if (!currentList.any((e) => e.id == movie.id)) {
      currentList.add(movie);
      final encoded = json.encode(currentList.map((e) => e.toJson()).toList());
      await LocalStorageManager.saveData(key: _watchlistKey, value: encoded, boxName: _boxName);
    }
  }

  @override
  Future<void> removeFromWatchlist(String movieId) async {
    final currentList = await getWatchlist();
    currentList.removeWhere((e) => e.id == movieId);
    final encoded = json.encode(currentList.map((e) => e.toJson()).toList());
    await LocalStorageManager.saveData(key: _watchlistKey, value: encoded, boxName: _boxName);
  }

  @override
  Future<List<SavedMovieModel>> getDownloads() async {
    final data = await LocalStorageManager.getData(key: _downloadsKey, boxName: _boxName);
    if (data != null) {
      final List decoded = json.decode(data);
      return decoded.map((e) => SavedMovieModel.fromJson(e)).toList();
    }
    return [];
  }

  @override
  Future<void> saveDownload(SavedMovieModel movie) async {
    final currentList = await getDownloads();
    if (!currentList.any((e) => e.id == movie.id)) {
      currentList.add(movie);
      final encoded = json.encode(currentList.map((e) => e.toJson()).toList());
      await LocalStorageManager.saveData(key: _downloadsKey, value: encoded, boxName: _boxName);
    }
  }

  @override
  Future<void> removeDownload(String movieId) async {
    final currentList = await getDownloads();
    currentList.removeWhere((e) => e.id == movieId);
    final encoded = json.encode(currentList.map((e) => e.toJson()).toList());
    await LocalStorageManager.saveData(key: _downloadsKey, value: encoded, boxName: _boxName);
  }
}

