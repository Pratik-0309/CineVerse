import express from "express";
import {
  trendingMoviesDaily,
  trendingMoviesWeekly,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies,
  searchMovies,
  searchActors,
  movieDetails,
  castAndCrews,
  MovieTrailer,
  similarMovies,
  RecommendedMovies,
  movieImages,
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
movieRouter.get("/search-actors", searchActors);
movieRouter.get("/:movieId", movieDetails);
movieRouter.get("/:movieId/credits", castAndCrews);
movieRouter.get("/:movieId/videos", MovieTrailer);
movieRouter.get("/:movieId/similar",similarMovies);
movieRouter.get("/:movieId/recommendations",RecommendedMovies);
movieRouter.get("/:movieId/images",movieImages);
movieRouter.get("/actor/:actorId",actorDetails);
movieRouter.get("/:movieId/providers",watchProviders);

export default movieRouter;
