import 'package:dio/dio.dart';
import 'package:jr_movie/core/network/api_endpoints.dart';
import '../models/movie_details_model.dart';

abstract class MovieDetailsRemoteDataSource {
  Future<MovieDetailsModel> getMovieDetails(String movieId);
}

class MovieDetailsRemoteDataSourceImpl implements MovieDetailsRemoteDataSource {
  final Dio dio;

  MovieDetailsRemoteDataSourceImpl({required this.dio});

  @override
  Future<MovieDetailsModel> getMovieDetails(String movieId) async {
    try {
      final response = await dio.get(ApiEndpoints.movieDetails(movieId));
      if (response.statusCode == 200) {
        return MovieDetailsModel.fromJson(response.data['data']);
      } else {
        throw Exception('Failed to load movie details');
      }
    } catch (e) {
      throw Exception('Server error: ${e.toString()}');
    }
  }
}

