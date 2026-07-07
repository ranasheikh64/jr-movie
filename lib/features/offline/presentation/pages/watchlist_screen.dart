import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../bloc/offline_bloc.dart';
import '../bloc/offline_event.dart';
import '../bloc/offline_state.dart';

class WatchlistScreen extends StatelessWidget {
  const WatchlistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    context.read<OfflineBloc>().add(FetchWatchlistEvent());

    return Scaffold(
      appBar: AppBar(title: const Text('My Watchlist')),
      body: BlocConsumer<OfflineBloc, OfflineState>(
        listener: (context, state) {
          if (state is OfflineSuccess) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(state.message)));
          } else if (state is OfflineError) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(state.message)));
          }
        },
        builder: (context, state) {
          if (state is OfflineLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is WatchlistLoaded) {
            if (state.movies.isEmpty) {
              return const Center(child: Text('Your watchlist is empty.'));
            }
            return ListView.builder(
              itemCount: state.movies.length,
              itemBuilder: (context, index) {
                final movie = state.movies[index];
                return ListTile(
                  leading: CachedNetworkImage(
                    imageUrl: movie.posterUrl,
                    width: 50,
                    fit: BoxFit.cover,
                  ),
                  title: Text(movie.title),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red),
                    onPressed: () {
                      context.read<OfflineBloc>().add(RemoveFromWatchlistEvent(movie.id));
                    },
                  ),
                );
              },
            );
          }
          return const Center(child: Text('Failed to load watchlist.'));
        },
      ),
    );
  }
}
