export class MoviesApi {
  baseUrl = 'https://api.themoviedb.org/3';
  optionsGet = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTM1OTk0NmE0ZmI3YTkyODY0NTJmYmIyY2EzYjY1YiIsInN1YiI6IjY1OTJkNDczZTY0MGQ2MDE0MGQ1ZjA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y4kt3GTXbHRlc8nc7VIvBqcb2_4DFy4WEyzsy1OKZEE',
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

  getRatedMovies = async (guestId) => {
    const url = `${this.baseUrl}/guest_session/${guestId}/rated/movies`;
    const data = await fetch(url, this.optionsGet);
    return await data.json();
  };

  getGenreMovies = async () => {
    const url = `${this.baseUrl}/genre/movie/list`;
    const data = await fetch(url, this.optionsGet);
    const { genres } = await data.json();
    return genres;
  };
}
