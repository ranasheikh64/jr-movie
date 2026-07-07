import 'package:flutter/material.dart';

class AppLifecycleManager extends StatefulWidget {
  final Widget child;

  const AppLifecycleManager({super.key, required this.child});

  @override
  State<AppLifecycleManager> createState() => _AppLifecycleManagerState();
}

class _AppLifecycleManagerState extends State<AppLifecycleManager> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    
    // অ্যাপের বিভিন্ন স্টেট এখানে ট্র্যাক করা হবে
    switch (state) {
      case AppLifecycleState.resumed:
        // অ্যাপ যখন আবার সামনে আসবে
        debugPrint('App State: Resumed (Foreground)');
        break;
      case AppLifecycleState.inactive:
        // অ্যাপ যখন ইনঅ্যাকটিভ থাকবে (যেমন কল আসলে)
        debugPrint('App State: Inactive');
        break;
      case AppLifecycleState.paused:
        // অ্যাপ যখন ব্যাকগ্রাউন্ডে চলে যাবে
        debugPrint('App State: Paused (Background)');
        break;
      case AppLifecycleState.detached:
        // অ্যাপ যখন পুরোপুরি বন্ধ হয়ে যাবে
        debugPrint('App State: Detached (Terminated)');
        break;
      case AppLifecycleState.hidden:
        // অ্যাপ যখন হাইড হবে
        debugPrint('App State: Hidden');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return widget.child;
  }
}
