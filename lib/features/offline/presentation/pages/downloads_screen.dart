import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../bloc/offline_bloc.dart';
import '../bloc/offline_event.dart';
import '../bloc/offline_state.dart';

class DownloadsScreen extends StatelessWidget {
  const DownloadsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    context.read<OfflineBloc>().add(FetchDownloadsEvent());

    return Scaffold(
      appBar: AppBar(title: const Text('My Downloads')),
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
          } else if (state is DownloadsLoaded) {
            if (state.movies.isEmpty) {
              return const Center(child: Text('You have no downloaded movies.'));
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
                  subtitle: const Text('Downloaded'),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red),
                    onPressed: () {
                      context.read<OfflineBloc>().add(RemoveDownloadEvent(movie.id));
                    },
                  ),
                  onTap: () {
                    // Play local video
                  },
                );
              },
            );
          }
          return const Center(child: Text('Failed to load downloads.'));
        },
      ),
    );
  }
}
