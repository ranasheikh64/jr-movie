import 'package:flutter_bloc/flutter_bloc.dart';
import 'profile_event.dart';
import 'profile_state.dart';
import 'package:jr_movie/features/auth/domain/repositories/auth_repository.dart';

class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  final AuthRepository authRepository;

  ProfileBloc({required this.authRepository}) : super(ProfileInitial()) {
    on<LoadProfileEvent>(_onLoadProfile);
  }

  void _onLoadProfile(LoadProfileEvent event, Emitter<ProfileState> emit) async {
    emit(ProfileLoading());
    final result = await authRepository.getCurrentUser();
    
    result.fold(
      (failure) => emit(ProfileError(failure)),
      (user) => emit(ProfileLoaded(user)),
    );
  }
}

