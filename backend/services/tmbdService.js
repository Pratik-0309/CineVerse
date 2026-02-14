import axios from "axios";

const TMDB_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: TMDB_URL,
  headers: {
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

export const getTrendingDaily = () =>
  tmdb.get("/trending/movie/day");


export const getTrendingWeekly = () =>
  tmdb.get("/trending/movie/week");

export const getPopularMovies = () =>
  tmdb.get("/movie/popular");

export const getTopRatedMovies = () =>
  tmdb.get("/movie/top_rated");

export const getUpcomingMovies = () =>
  tmdb.get("/movie/upcoming");

export const getNowPlayingMovies = () =>
  tmdb.get("/movie/now_playing");


export const searchMoviesService = (query) =>
  tmdb.get(`/search/movie?query=${query}`);

export const searchActorsService = (query) =>
  tmdb.get(`/search/person?query=${query}`);

export const getMovieDetailsService = (movieId) =>
  tmdb.get(`/movie/${movieId}`);

export const getCastAndCrewService = (movieId) =>
  tmdb.get(`/movie/${movieId}/credits`);

export const getMovieVideosService = (movieId) =>
  tmdb.get(`/movie/${movieId}/videos`);

export const getSimilarMoviesService = (movieId) =>
  tmdb.get(`/movie/${movieId}/similar`);

export const getRecommendationsService = (movieId) =>
  tmdb.get(`/movie/${movieId}/recommendations`);

export const getMovieImagesService = (movieId) =>
  tmdb.get(`/movie/${movieId}/images`);


export const getActorDetailsService = (actorId) =>
  tmdb.get(`/person/${actorId}/movie_credits`);

export const getWatchProvidersService = (movieId) =>
  tmdb.get(`/movie/${movieId}/watch/providers`);