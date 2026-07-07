class ApiEndpoints {
  // Base URL
  static const String baseUrl = 'http://127.0.0.1:3000/v1'; // Replace with your actual backend URL

  // Auth Endpoints
  static const String login = '$baseUrl/auth/login';
  static const String register = '$baseUrl/auth/register';
  static const String forgotPassword = '$baseUrl/auth/forgot-password';

  // Movie Endpoints
  static const String featuredMovies = '$baseUrl/movies/featured';
  static const String trendingMovies = '$baseUrl/movies/trending';
  static const String latestMovies = '$baseUrl/movies/latest';
  static const String popularMovies = '$baseUrl/movies/popular';
  
  // Create a function for dynamic endpoints
  static String movieDetails(String movieId) => '$baseUrl/movies/$movieId';
  
  // More endpoints will be added as we develop features...
}
