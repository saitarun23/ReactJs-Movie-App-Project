import React from 'react';
import MovieCard from './MovieCard';

function MovieList  ({ movies })  {
  return (
    <div className="MovieList">
      {movies.map(movie => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
