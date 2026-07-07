import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import '../../features/auth/data/datasources/auth_local_datasource.dart';
import '../../features/auth/data/datasources/auth_remote_datasource.dart';
import '../../features/auth/data/repositories/auth_repository_impl.dart';
import '../../features/auth/domain/repositories/auth_repository.dart';
import '../../features/auth/domain/usecases/login_usecase.dart';
import '../../features/auth/domain/usecases/signup_usecase.dart';
import '../../features/auth/presentation/bloc/auth_bloc.dart';
import '../../features/home/data/datasources/movie_remote_datasource.dart';
import '../../features/home/data/repositories/movie_repository_impl.dart';
import '../../features/home/domain/repositories/movie_repository.dart';
import '../../features/home/presentation/bloc/home_bloc.dart';
import '../../features/search/data/datasources/search_remote_datasource.dart';
import '../../features/search/data/repositories/search_repository_impl.dart';
import '../../features/search/domain/repositories/search_repository.dart';
import '../../features/search/domain/usecases/search_movies_usecase.dart';
import '../../features/search/presentation/bloc/search_bloc.dart';
import '../../features/offline/data/datasources/offline_local_datasource.dart';
import '../../features/offline/data/repositories/offline_repository_impl.dart';
import '../../features/offline/domain/repositories/offline_repository.dart';
import '../../features/offline/presentation/bloc/offline_bloc.dart';
import '../../features/profile/presentation/bloc/profile_bloc.dart';
import '../../features/movie_details/data/datasources/movie_details_remote_datasource.dart';
import '../../features/movie_details/data/repositories/movie_details_repository_impl.dart';
import '../../features/movie_details/domain/repositories/movie_details_repository.dart';
import '../../features/movie_details/domain/usecases/get_movie_details_usecase.dart';
import '../../features/movie_details/presentation/bloc/movie_details_bloc.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // Core
  sl.registerLazySingleton(() => Dio());

  // Data sources
  sl.registerLazySingleton<AuthLocalDataSource>(() => AuthLocalDataSourceImpl());
  sl.registerLazySingleton<AuthRemoteDataSource>(() => AuthRemoteDataSourceImpl(dio: sl()));
  sl.registerLazySingleton<MovieRemoteDataSource>(() => MovieRemoteDataSourceImpl(dio: sl()));
  sl.registerLazySingleton<SearchRemoteDataSource>(() => SearchRemoteDataSourceImpl(dio: sl()));
  sl.registerLazySingleton<OfflineLocalDataSource>(() => OfflineLocalDataSourceImpl());
  sl.registerLazySingleton<MovieDetailsRemoteDataSource>(() => MovieDetailsRemoteDataSourceImpl(dio: sl()));

  // Repositories
  sl.registerLazySingleton<AuthRepository>(() => AuthRepositoryImpl(localDataSource: sl(), remoteDataSource: sl()));
  sl.registerLazySingleton<MovieRepository>(() => MovieRepositoryImpl(remoteDataSource: sl()));
  sl.registerLazySingleton<SearchRepository>(() => SearchRepositoryImpl(remoteDataSource: sl()));
  sl.registerLazySingleton<OfflineRepository>(() => OfflineRepositoryImpl(localDataSource: sl()));
  sl.registerLazySingleton<MovieDetailsRepository>(() => MovieDetailsRepositoryImpl(remoteDataSource: sl()));

  // Use cases
  sl.registerLazySingleton(() => LoginUseCase(sl()));
  sl.registerLazySingleton(() => SignUpUseCase(sl()));
  sl.registerLazySingleton(() => SearchMoviesUseCase(sl()));
  sl.registerLazySingleton(() => GetMovieDetailsUseCase(sl()));

  // Blocs
  sl.registerFactory(() => AuthBloc(loginUseCase: sl(), signUpUseCase: sl(), authRepository: sl()));
  sl.registerFactory(() => HomeBloc(movieRepository: sl()));
  sl.registerFactory(() => SearchBloc(searchMoviesUseCase: sl()));
  sl.registerFactory(() => OfflineBloc(repository: sl()));
  sl.registerFactory(() => ProfileBloc(authRepository: sl()));
  sl.registerFactory(() => MovieDetailsBloc(getMovieDetailsUseCase: sl()));
}
