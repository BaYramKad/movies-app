import React, { useEffect, useState } from 'react';

import { MoviesItem } from './components/MoviesItem';
import { MoviesApi } from './access/movies-api';
import { Loader } from './access/loader';
import { Error } from './access/Error';

const api = new MoviesApi();

export const App = () => {
  const [state, setState] = useState({
    movies: [],
    pending: true,
    rejected: false,
  });
  const moviesLoad = (res) => {
    setState({ movies: res, pending: false });
  };
  const catchError = () => {
    setState({ rejected: true, pending: false });
  };
  useEffect(() => {
    api.getAllMovies().then(moviesLoad).catch(catchError);
  }, []);

  const { pending, rejected } = state;
  const hasData = !(pending || rejected);

  const items = hasData ? <MoviesItem movies={state.movies} /> : null;
  const loader = pending ? <Loader size={'large'} /> : null;
  const error = rejected ? <Error /> : null;
  return (
    <div className="app">
      {loader}
      {items}
      {error}
    </div>
  );
};
