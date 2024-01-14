import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { MoviesApi } from './access/movies-api';
import { Loader } from './access/loader';
import { Error } from './access/Error';

import { MoviesItem } from './components/MoviesItem';
import { Menu } from './components/Menu';
import { InputComponent } from './components/Input';
import { RatedMovies } from './components/RatedMovies';
import { MyContext } from '.';

const api = new MoviesApi();

export const App = () => {
  const objState = {
    movies: [],
    pending: true,
    rejected: false,
    reasonError: [],
  };

  const paginationObj = {
    page: 1,
    totalPages: 0,
    totalResults: 0,
  };
  const [state, setState] = useState(objState);
  const [isOnline, setIsOnline] = useState(false);
  const [pagination, setPagination] = useState(paginationObj);
  const [query, setQuery] = useState('');
  const [queryPending, setQueryPending] = useState(false);
  const [choisedMovies, setChoisedMovies] = useState('search');
  const [genres, setGenres] = useState([]);

  const moviesLoad = ({ results, page, totalPages, totalResults }) => {
    setQueryPending(false);
    setState({ movies: results, pending: false });
    setPagination((prevPagination) => {
      return {
        ...prevPagination,
        page,
        totalPages,
        totalResults,
      };
    });
  };
  const catchError = (resError) => {
    setState({ rejected: true, reasonError: resError, pending: false });
  };
  const updateQuery = (event) => setQuery(event.target.value);

  const changePage = (page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page,
    }));
  };

  const deboundOnChange = debounce(updateQuery, 500);

  const updateStateMovies = (query, currentPage) => {
    api
      .getAllMovies(query, currentPage)
      .then((res) => {
        moviesLoad(res);
        api.getGenreMovies().then((resGenres) => {
          setGenres(resGenres);
        });
      })
      .catch((err) => {
        catchError(err);
      });
  };

  const postRateMovie = async (movieId, rate) => {
    setState((prev) => ({ ...prev, rejected: false }));

    const storageRatedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || [];
    const ratedMovie = state.movies.find((item) => item.id === movieId);
    const chengeTheRate = {
      ...ratedMovie,
      vote_average: rate,
    };

    const filteredRatedMovies = storageRatedMovies.filter((item) => item.id !== movieId);
    localStorage.setItem('ratedMovies', JSON.stringify([chengeTheRate, ...filteredRatedMovies]));
  };
  const handleOnline = (event) => {
    if (event.type === 'offline') {
      setIsOnline(true);
    } else if (event.type === 'online') {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    updateStateMovies(query, pagination.page);

    window.addEventListener('offline', handleOnline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOnline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    updateStateMovies(query, pagination.page);
  }, [query, pagination.page]);

  const { pending, rejected, reasonError } = state;
  const hasData = !(pending || rejected);
  const items = hasData ? (
    <MoviesItem
      movies={state.movies}
      query={query}
      queryPending={queryPending}
      pageInfo={pagination}
      changePage={changePage}
    />
  ) : null;

  const loader = pending ? <Loader size={'large'} /> : null;
  const error = rejected ? <Error reasonError={reasonError} network={isOnline} /> : null;
  const searchPage = (
    <>
      <InputComponent
        inputEvent={(event) => {
          const value = event.target.value.trim();
          if (value.length) setQueryPending(true);
          deboundOnChange(event);
        }}
      />
      {items}
    </>
  );

  const choicedMoviesItems =
    choisedMovies === 'search' ? (
      searchPage
    ) : (
      <RatedMovies genres={genres} postRateMovie={postRateMovie} />
    );

  if (isOnline) {
    return <Error network={isOnline} />;
  }

  return (
    <MyContext.Provider value={{ genres, postRateMovie }}>
      <div className="app">
        <Menu onChoiceMovies={(text) => setChoisedMovies(text)} choisedMovies={choisedMovies} />
        {choicedMoviesItems}
        {loader}
        {error}
      </div>
    </MyContext.Provider>
  );
};
