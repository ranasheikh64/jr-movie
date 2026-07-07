import 'package:equatable/equatable.dart';

class MovieEntity extends Equatable {
  final String id;
  final String title;
  final String posterUrl;
  final String? backdropUrl;
  final double rating;
  final String? releaseDate;

  const MovieEntity({
    required this.id,
    required this.title,
    required this.posterUrl,
    this.backdropUrl,
    this.rating = 0.0,
    this.releaseDate,
  });

  @override
  List<Object?> get props => [id, title, posterUrl, backdropUrl, rating, releaseDate];
}
