import 'package:dartz/dartz.dart';
import '../../domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_datasource.dart';
import '../datasources/auth_local_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  @override
  Future<Either<String, UserEntity>> login(String email, String password) async {
    try {
      final user = await remoteDataSource.login(email, password);
      await localDataSource.cacheUser(user);
      return Right(user);
    } catch (e) {
      return Left('Failed to login. Please try again later.');
    }
  }

  @override
  Future<Either<String, UserEntity>> signUp(String name, String email, String password) async {
    try {
      final user = await remoteDataSource.signUp(name, email, password);
      await localDataSource.cacheUser(user);
      return Right(user);
    } catch (e) {
      return Left('Failed to sign up. Please try again later.');
    }
  }

  @override
  Future<Either<String, UserEntity>> googleLogin() async {
    // Implement Google Login logic
    return const Left('Google Login not implemented yet');
  }

  @override
  Future<Either<String, UserEntity>> appleLogin() async {
    // Implement Apple Login logic
    return const Left('Apple Login not implemented yet');
  }

  @override
  Future<Either<String, void>> logout() async {
    try {
      await localDataSource.clearCache();
      return const Right(null);
    } catch (e) {
      return const Left('Failed to logout');
    }
  }

  @override
  Future<Either<String, UserEntity>> getCurrentUser() async {
    try {
      final user = await localDataSource.getLastUser();
      if (user != null) {
        return Right(user);
      } else {
        return const Left('No user logged in');
      }
    } catch (e) {
      return const Left('Failed to get user');
    }
  }

  @override
  Future<Either<String, void>> resetPassword(String email) async {
    // Implement reset password logic
    return const Left('Reset password not implemented yet');
  }
}
