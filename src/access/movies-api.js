export class MoviesApi {
  async getAllMovies() {
    const url =
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTM1OTk0NmE0ZmI3YTkyODY0NTJmYmIyY2EzYjY1YiIsInN1YiI6IjY1OTJkNDczZTY0MGQ2MDE0MGQ1ZjA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y4kt3GTXbHRlc8nc7VIvBqcb2_4DFy4WEyzsy1OKZEE',
      },
    };

    const data = await fetch(url, options);

    if (!data.ok) {
      throw new Error(`Could not fetch ${url}, received ${data.status}`);
    }
    const res = await data.json();
    return res.results;
  }
}
