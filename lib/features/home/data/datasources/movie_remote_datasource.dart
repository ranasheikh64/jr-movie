import 'package:dio/dio.dart';
import 'package:jr_movie/core/network/api_endpoints.dart';
import '../models/movie_model.dart';

abstract class MovieRemoteDataSource {
  Future<List<MovieModel>> getFeaturedMovies();
  Future<List<MovieModel>> getTrendingMovies();
  Future<List<MovieModel>> getLatestMovies();
}

class MovieRemoteDataSourceImpl implements MovieRemoteDataSource {
  final Dio dio;

  MovieRemoteDataSourceImpl({required this.dio});

  @override
  Future<List<MovieModel>> getFeaturedMovies() async {
    try {
      final response = await dio.get(ApiEndpoints.featuredMovies);
      if (response.statusCode == 200) {
        return (response.data['data'] as List)
            .map((e) => MovieModel.fromJson(e))
            .toList();
      } else {
        throw Exception('Failed to load featured movies');
      }
    } catch (e) {
      throw Exception('Server error: ${e.toString()}');
    }
  }

  @override
  Future<List<MovieModel>> getTrendingMovies() async {
    try {
      final response = await dio.get(ApiEndpoints.trendingMovies);
      if (response.statusCode == 200) {
        return (response.data['data'] as List)
            .map((e) => MovieModel.fromJson(e))
            .toList();
      } else {
        throw Exception('Failed to load trending movies');
      }
    } catch (e) {
      throw Exception('Server error: ${e.toString()}');
    }
  }

  @override
  Future<List<MovieModel>> getLatestMovies() async {
    try {
      final response = await dio.get(ApiEndpoints.latestMovies);
      if (response.statusCode == 200) {
        return (response.data['data'] as List)
            .map((e) => MovieModel.fromJson(e))
            .toList();
      } else {
        throw Exception('Failed to load latest movies');
      }
    } catch (e) {
      throw Exception('Server error: ${e.toString()}');
    }
  }
}

