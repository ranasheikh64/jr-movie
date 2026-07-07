import 'package:hive_flutter/hive_flutter.dart';

class LocalStorageManager {
  static const String _defaultBoxName = 'app_default_box';

  static Future<void> init() async {
    await Hive.initFlutter();
  }

  static Future<void> saveData({required String key, required dynamic value, String boxName = _defaultBoxName}) async {
    final box = await Hive.openBox(boxName);
    await box.put(key, value);
  }

  static Future<dynamic> getData({required String key, String boxName = _defaultBoxName}) async {
    final box = await Hive.openBox(boxName);
    return box.get(key);
  }

  static Future<void> deleteData({required String key, String boxName = _defaultBoxName}) async {
    final box = await Hive.openBox(boxName);
    await box.delete(key);
  }

  static Future<void> clearBox({String boxName = _defaultBoxName}) async {
    final box = await Hive.openBox(boxName);
    await box.clear();
  }
}
