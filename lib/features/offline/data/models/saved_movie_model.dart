import '../../domain/entities/saved_movie_entity.dart';

class SavedMovieModel extends SavedMovieEntity {
  const SavedMovieModel({
    required super.id,
    required super.title,
    required super.posterUrl,
    super.localVideoPath,
    super.isWatchlist = false,
    super.isFavorite = false,
  });

  factory SavedMovieModel.fromJson(Map<String, dynamic> json) {
    return SavedMovieModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      posterUrl: json['poster_url'] ?? '',
      localVideoPath: json['local_video_path'],
      isWatchlist: json['is_watchlist'] ?? false,
      isFavorite: json['is_favorite'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'poster_url': posterUrl,
      'local_video_path': localVideoPath,
      'is_watchlist': isWatchlist,
      'is_favorite': isFavorite,
    };
  }

  factory SavedMovieModel.fromEntity(SavedMovieEntity entity) {
    return SavedMovieModel(
      id: entity.id,
      title: entity.title,
      posterUrl: entity.posterUrl,
      localVideoPath: entity.localVideoPath,
      isWatchlist: entity.isWatchlist,
      isFavorite: entity.isFavorite,
    );
  }
}
