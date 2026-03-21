import express from "express";
import {
  trendingMoviesDaily,
  trendingMoviesWeekly,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies,
  searchMovies,
  movieDetails,
  castAndCrews,
  MovieTrailer,
  similarMovies,
  movieReviews,
  RecommendedMovies,
  movieImages,
  getActorTopMovies,
  actorDetails,
  watchProviders,
} from "../controller/movie.controller.js";
import { cacheMiddleware } from "../middleware/cache.js";

const movieRouter = express.Router();

movieRouter.get("/trending/day", cacheMiddleware("trending:daily", 180 ),trendingMoviesDaily);
movieRouter.get("/trending/week",cacheMiddleware("trending:weekly", 180 ), trendingMoviesWeekly);
movieRouter.get("/popular",cacheMiddleware("movies:popular", 180 ), popularMovies);
movieRouter.get("/top-rated",cacheMiddleware("movies:topRated", 180 ), topRatedMovies);
movieRouter.get("/upcoming",cacheMiddleware("movies:upcoming", 180 ), upcomingMovies);
movieRouter.get("/now-playing",cacheMiddleware("movies:nowPlaying", 180 ), nowPlayingMovies);
movieRouter.get("/search-movies", searchMovies);
movieRouter.get("/actor/:actorId",actorDetails);
movieRouter.get("/actor/:actorId/movie",getActorTopMovies)
movieRouter.get("/:movieId/credits", castAndCrews);
movieRouter.get("/:movieId/videos", MovieTrailer);
movieRouter.get("/:movieId/similar",similarMovies);
movieRouter.get("/:movieId/reviews",movieReviews)
movieRouter.get("/:movieId/recommendations",RecommendedMovies);
movieRouter.get("/:movieId/images",movieImages);
movieRouter.get("/:movieId/providers",watchProviders);
movieRouter.get("/:movieId", movieDetails);

export default movieRouter;
