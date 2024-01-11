import { apiKey, defToken } from './apiAuthInfo';

export class MoviesApi {
  baseUrl = 'https://api.themoviedb.org/3';
  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: defToken,
    },
  };
  getAllMovies = async (query, page) => {
    const search = query.length ? query : 'return';
    const url = `${this.baseUrl}/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
    const data = await fetch(url, this.optionsGet);

    if (!data.ok) {
      throw data;
    }
    const res = await data.json();
    return {
      ...res,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    };
  };

  getGuestSessionId = async () => {
    const url = `${this.baseUrl}/authentication/guest_session/new`;
    const data = await fetch(url, this.optionsGet);
    return data.json();
  };

  getRatedMovies = async (guestId, page) => {
    const url = new URL(`${this.baseUrl}/guest_session/${guestId}/rated/movies`);
    const searchParams = new URLSearchParams({
      api_key: apiKey,
      language: 'en-US',
      page,
      sort_by: 'created_at.asc',
    });

    url.search = searchParams.toString();
    const data = await fetch(url, this.optionsGet);
    return await data.json();
  };

  getGenreMovies = async () => {
    const url = `${this.baseUrl}/genre/movie/list`;
    const data = await fetch(url, this.optionsGet);
    const { genres } = await data.json();
    return genres;
  };

  rateTheMovie = async (movieId, rate, guestSessionId) => {
    const url = new URL(`${this.baseUrl}/movie/${movieId}/rating`);
    const searchParams = new URLSearchParams({
      api_key: apiKey,
      guest_session_id: guestSessionId,
    });
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: defToken,
      },
      body: JSON.stringify({ value: rate }),
    };
    url.search = searchParams.toString();

    const data = await fetch(url.href, options);
    const result = await data.json();
    return result;
  };
}
