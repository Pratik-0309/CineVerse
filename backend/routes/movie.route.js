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

const movieRouter = express.Router();

movieRouter.get("/trending/day", trendingMoviesDaily);
movieRouter.get("/trending/week", trendingMoviesWeekly);
movieRouter.get("/popular", popularMovies);
movieRouter.get("/top-rated", topRatedMovies);
movieRouter.get("/upcoming", upcomingMovies);
movieRouter.get("/now-playing", nowPlayingMovies);
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
