import 'package:dartz/dartz.dart';
import '../entities/user_entity.dart';

abstract class AuthRepository {
  Future<Either<String, UserEntity>> login(String email, String password);
  Future<Either<String, UserEntity>> signUp(String name, String email, String password);
  Future<Either<String, UserEntity>> googleLogin();
  Future<Either<String, UserEntity>> appleLogin();
  Future<Either<String, void>> logout();
  Future<Either<String, UserEntity>> getCurrentUser();
  Future<Either<String, void>> resetPassword(String email);
}
