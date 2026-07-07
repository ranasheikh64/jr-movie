import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../bloc/movie_details_bloc.dart';
import '../bloc/movie_details_event.dart';
import '../bloc/movie_details_state.dart';

class MovieDetailsScreen extends StatelessWidget {
  final String movieId;

  const MovieDetailsScreen({super.key, required this.movieId});

  @override
  Widget build(BuildContext context) {
    // Dispatching event
    context.read<MovieDetailsBloc>().add(FetchMovieDetailsEvent(movieId));

    return Scaffold(
      body: BlocBuilder<MovieDetailsBloc, MovieDetailsState>(
        builder: (context, state) {
          if (state is MovieDetailsLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is MovieDetailsError) {
            return Center(child: Text(state.message));
          } else if (state is MovieDetailsLoaded) {
            final movie = state.movieDetails;
            return CustomScrollView(
              slivers: [
                SliverAppBar(
                  expandedHeight: 300,
                  pinned: true,
                  flexibleSpace: FlexibleSpaceBar(
                    title: Text(movie.title, style: const TextStyle(fontSize: 16)),
                    background: CachedNetworkImage(
                      imageUrl: movie.backdropUrl ?? movie.posterUrl,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.star, color: Colors.amber),
                            const SizedBox(width: 5),
                            Text('${movie.rating}/10', style: const TextStyle(fontSize: 16)),
                            const SizedBox(width: 20),
                            ElevatedButton.icon(
                              onPressed: () {
                                // Navigate to Video Player
                              },
                              icon: const Icon(Icons.play_arrow),
                              label: const Text('Play'),
                            )
                          ],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Synopsis',
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        Text(movie.description),
                      ],
                    ),
                  ),
                ),
              ],
            );
          }
          return const SizedBox.shrink();
        },
      ),
    );
  }
}
