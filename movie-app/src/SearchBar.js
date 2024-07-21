import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import Loading from './Loading';
import Error from './Error';

function SearchBar ()  {
  let [movies, setMovies] = useState([]);
  let [filteredMovies, setFilteredMovies] = useState([]);
  let [query, setQuery] = useState('');
  let [searchType, setSearchType] = useState('title'); // Default search type is by title
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/movies')
      .then(result => {
        setMovies(result.data);
        setLoading(false);
        setError(''); // Clear any previous error message
      })
      .catch(error => {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      });
  }, []);

  let handleSearch = () => {
    if (!query.trim()) {
      setError('Please enter a search Criteria.');
      setFilteredMovies([]);
      return;
    }

    let filtered = movies.filter(movie => {
      let lowerCaseQuery = query.toLowerCase();
      if (searchType === 'title' && movie.title) {
        return movie.title.toLowerCase().includes(lowerCaseQuery);
      } else if (searchType === 'rating' && movie.rating) {
        return movie.rating.toString() === query;
      } else if (searchType === 'genre' && movie.genre) {
        return movie.genre.toLowerCase().includes(lowerCaseQuery);
      }
      return false;
    });

    setFilteredMovies(filtered);

    if (filtered.length === 0) {
      setError(`No movies found matching ${searchType}: ${query}`);
    } else {
      setError(''); // Clear the error message if movies are found
    }
  };

  return (
    <div>
      <div className="SearchBar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ${searchType}...`}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="rating">Rating</option>
          <option value="genre">Genre</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {filteredMovies.length > 0 && <MovieList movies={filteredMovies} />} 
      
      
    </div>
  );
};

export default SearchBar;
