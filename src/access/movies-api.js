export class MoviesApi {
  async getAllMovies(query, page) {
    const search = query.length ? query : 'return';
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
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
      throw data;
    }
    const res = await data.json();
    console.log('res: ', res);
    return {
      ...res,
      totalPages: res.total_pages,
      totalResults: res.total_results,
    };
  }
}
