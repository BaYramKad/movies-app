import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { MoviesItem } from './components/MoviesItem';
import { MoviesApi } from './access/movies-api';
import { Loader } from './access/loader';
import { Error } from './access/Error';

const api = new MoviesApi();

export const App = () => {
  const objState = {
    movies: [],
    pending: true,
    rejected: false,
    reasonError: [],
  };
  const networkObj = {
    offline: false,
    online: true,
  };

  const paginationObj = {
    page: 1,
    totalPages: 0,
    totalResults: 0,
  };
  const [state, setState] = useState(objState);
  const [isNetwork, setIsNetwork] = useState(networkObj);
  const [query, setQuery] = useState('');
  const [queryPending, setQueryPending] = useState(false);
  const [pagination, setPagination] = useState(paginationObj);

  const moviesLoad = ({ results, page, totalPages, totalResults }) => {
    setQueryPending(false);
    setPagination({
      page,
      totalPages,
      totalResults,
    });
    setState({ movies: results, pending: false });
  };
  const catchError = (data) => {
    setState({ rejected: true, reasonError: data, pending: false });
  };
  const updateQuery = (event) => {
    const value = event.target.value.trim();
    setQuery(value);
  };

  const changePage = (page, totalPages) => {
    console.log('totalPages: ', totalPages);
    console.log('page: ', page);
    setPagination({
      page,
    });
  };

  const deboundOnChange = debounce(updateQuery, 500);
  const handleOffline = () => setIsNetwork({ offline: true, online: false });
  const handleOnline = () => setIsNetwork({ offline: false, online: true });

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const updateStateMovies = (query, currentPage) => {
    api
      .getAllMovies(query, currentPage)
      .then(moviesLoad)
      .catch((err) => {
        catchError(err);
      });
  };

  useEffect(() => {
    updateStateMovies(query, pagination.page);
  }, []);

  useEffect(() => {
    updateStateMovies(query, pagination.page);
  }, [query, pagination.page]);

  const { pending, rejected, reasonError } = state;

  const hasData = !(pending || rejected);
  const items = hasData ? (
    <MoviesItem
      movies={state.movies}
      inputEvent={(event) => {
        setQueryPending(true);
        deboundOnChange(event);
      }}
      query={query}
      queryPending={queryPending}
      pageInfo={pagination}
      changePage={changePage}
    />
  ) : null;
  const loader = pending ? <Loader size={'large'} /> : null;
  const error = rejected ? <Error reasonError={reasonError} network={isNetwork} /> : null;

  if (isNetwork.offline) {
    return <Error network={isNetwork} />;
  }
  return (
    <div className="app">
      {loader}
      {items}
      {error}
    </div>
  );
};
