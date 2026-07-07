import 'package:equatable/equatable.dart';

abstract class SearchEvent extends Equatable {
  const SearchEvent();

  @override
  List<Object> get props => [];
}

class QueryMoviesEvent extends SearchEvent {
  final String query;
  const QueryMoviesEvent(this.query);

  @override
  List<Object> get props => [query];
}
