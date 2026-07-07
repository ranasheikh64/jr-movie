import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/home_bloc.dart';
import '../bloc/home_event.dart';
import '../bloc/home_state.dart';
import 'widgets/movie_card_widget.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Dispatching event (ensure this is only called once in a real app, e.g., via Router or MultiBlocProvider)
    context.read<HomeBloc>().add(FetchHomeDataEvent());

    return Scaffold(
      appBar: AppBar(title: const Text('JR Movie')),
      body: BlocBuilder<HomeBloc, HomeState>(
        builder: (context, state) {
          if (state is HomeLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is HomeError) {
            return Center(child: Text(state.message));
          } else if (state is HomeLoaded) {
            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSectionTitle(context, 'Featured Movies'),
                  _buildHorizontalList(state.featuredMovies),
                  _buildSectionTitle(context, 'Trending Movies'),
                  _buildHorizontalList(state.trendingMovies),
                  _buildSectionTitle(context, 'Latest Movies'),
                  _buildHorizontalList(state.latestMovies),
                  const SizedBox(height: 20),
                ],
              ),
            );
          }
          return const Center(child: Text('Welcome to JR Movie'));
        },
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 10),
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildHorizontalList(List movies) {
    return SizedBox(
      height: 220,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 10),
        itemCount: movies.length,
        itemBuilder: (context, index) {
          final movie = movies[index];
          return MovieCardWidget(movie: movie);
        },
      ),
    );
  }
}
