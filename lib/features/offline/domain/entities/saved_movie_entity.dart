import 'package:equatable/equatable.dart';

class SavedMovieEntity extends Equatable {
  final String id;
  final String title;
  final String posterUrl;
  final String? localVideoPath; // For downloads
  final bool isWatchlist;
  final bool isFavorite;

  const SavedMovieEntity({
    required this.id,
    required this.title,
    required this.posterUrl,
    this.localVideoPath,
    this.isWatchlist = false,
    this.isFavorite = false,
  });

  @override
  List<Object?> get props => [id, title, posterUrl, localVideoPath, isWatchlist, isFavorite];
}
