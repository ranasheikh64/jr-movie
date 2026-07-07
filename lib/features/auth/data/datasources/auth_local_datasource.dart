import 'package:jr_movie/core/utils/local_storage_manager.dart';
import '../models/user_model.dart';
import 'dart:convert';

abstract class AuthLocalDataSource {
  Future<void> cacheUser(UserModel userToCache);
  Future<UserModel?> getLastUser();
  Future<void> clearCache();
}

class AuthLocalDataSourceImpl implements AuthLocalDataSource {
  static const String _userBoxName = 'user_box';
  static const String _cachedUserKey = 'CACHED_USER';

  @override
  Future<void> cacheUser(UserModel userToCache) async {
    final userJsonString = json.encode(userToCache.toJson());
    await LocalStorageManager.saveData(
      key: _cachedUserKey,
      value: userJsonString,
      boxName: _userBoxName,
    );
  }

  @override
  Future<UserModel?> getLastUser() async {
    final userJsonString = await LocalStorageManager.getData(
      key: _cachedUserKey,
      boxName: _userBoxName,
    );
    if (userJsonString != null) {
      return UserModel.fromJson(json.decode(userJsonString));
    } else {
      return null;
    }
  }

  @override
  Future<void> clearCache() async {
    await LocalStorageManager.deleteData(
      key: _cachedUserKey,
      boxName: _userBoxName,
    );
  }
}

