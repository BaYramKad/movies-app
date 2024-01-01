import React, { useEffect, useState } from 'react';

import { MoviesItem } from './components/MoviesItem';
import { MoviesApi } from './movies-api';

const api = new MoviesApi();

export const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.getAllMovies().then((res) => {
      setMovies(res);
    });
  }, []);
  return (
    <div className="app">
      <MoviesItem movies={movies} />
    </div>
  );
};
