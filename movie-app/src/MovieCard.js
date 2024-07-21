import React from 'react';

function MovieCard ({ movie })  {
  return (
    <div className="MovieCard">
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <p>Year: {movie.year}</p>
      <p>Runtime: {movie.runtime}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genre: {movie.genre}</p>
    </div>
  );
};

export default MovieCard;
