import { apiKey, defToken } from './apiAuthInfo';

export class MoviesApi {
  baseUrl = 'https://api.themoviedb.org/3';
  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
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
    const result = await data.json();
    return result;
  };

  getRatedMovies = async (guestSessionId, page) => {
    // Возврощает пустой массыв, даже после оценки
    const url = new URL(`${this.baseUrl}/guest_session/${guestSessionId}/rated/movies`);
    const searchParams = new URLSearchParams({
      sort_by: 'created_at.asc',
      language: 'en-US',
      api_key: apiKey,
    });

    url.search = searchParams.toString();
    const data = await fetch(url, this.optionsGet);
    const result = await data.json();
    return result;
  };

  getGenreMovies = async () => {
    const url = `${this.baseUrl}/genre/movie/list`;
    const data = await fetch(url, this.optionsGet);
    const { genres } = await data.json();
    return genres;
  };

  rateTheMovie = async (movieId, rate, guestSessionId) => {
    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/rating`);
    const searchParams = new URLSearchParams({
      apikey: apiKey,
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
    const data = await fetch(url, options);
    const result = await data.json();
    console.log('result: ', result);
    return result;
  };
}

// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'Content-Type': 'application/json;charset=utf-8',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTM1OTk0NmE0ZmI3YTkyODY0NTJmYmIyY2EzYjY1YiIsInN1YiI6IjY1OTJkNDczZTY0MGQ2MDE0MGQ1ZjA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y4kt3GTXbHRlc8nc7VIvBqcb2_4DFy4WEyzsy1OKZEE'
//   }
// };

// fetch(url,
