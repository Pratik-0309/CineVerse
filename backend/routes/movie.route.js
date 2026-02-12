import express from "express";
import {
  trendingMoviesDaily,
  trendingMoviesWeekly,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies
} from "../controller/movie.controller.js";

const movieRouter = express.Router();

movieRouter.get("/trending/day", trendingMoviesDaily);
movieRouter.get("/trending/week", trendingMoviesWeekly);
movieRouter.get("/popular", popularMovies);
movieRouter.get("/top-rated", topRatedMovies);
movieRouter.get("/upcoming", upcomingMovies);
movieRouter.get("/now-playing", nowPlayingMovies);


export default movieRouter;
