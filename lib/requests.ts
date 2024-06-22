export const apiKey = process.env.NEXT_PUBLIC_API_KEY_TMDB;

export const request = {
  trendingAll: `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`,
  trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=hr-HR&page=1&region=ISO%203166-2%3AHR`,
  trendingTVShows: `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=hr-HR&page=1&region=ISO%203166-2%3AHR`,
  latestMovies: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
  latestTVShows: `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`,
  popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=hr-HR&page=1&region=ISO%203166-2%3AHR`,
  popularTVShows: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=hr-HR&page=1&region=ISO%203166-2%3AHR`,
  topRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=hr-HR&page=1&region=ISO%203166-2%3AHR`,
  topRatedTVShows: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=hr-HR&page=1&region=ISO%203166-2%3AHR`,
  actionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=hr-HR&page=1&sort_by=popularity.desc&with_genres=28`,
  dramaMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=hr-HR&page=1&sort_by=popularity.desc&with_genres=18`,
  musicMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=hr-HR&page=1&sort_by=popularity.desc&with_genres=10402`,
};
