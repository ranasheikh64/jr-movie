import 'package:dio/dio.dart';
import 'package:jr_movie/core/network/api_endpoints.dart';
import 'package:jr_movie/features/home/data/models/movie_model.dart';

abstract class SearchRemoteDataSource {
  Future<List<MovieModel>> searchMovies(String query);
}

class SearchRemoteDataSourceImpl implements SearchRemoteDataSource {
  final Dio dio;

  SearchRemoteDataSourceImpl({required this.dio});

  @override
  Future<List<MovieModel>> searchMovies(String query) async {
    try {
      // Assuming you will add a search endpoint to ApiEndpoints later
      final response = await dio.get('${ApiEndpoints.baseUrl}/movies/search', queryParameters: {'q': query});
      if (response.statusCode == 200) {
        return (response.data['data'] as List)
            .map((e) => MovieModel.fromJson(e))
            .toList();
      } else {
        throw Exception('Failed to search movies');
      }
    } catch (e) {
      throw Exception('Search failed: ${e.toString()}');
    }
  }
}

