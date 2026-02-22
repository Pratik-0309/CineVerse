import {
  getTrendingDaily,
  getTrendingWeekly,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMoviesService,
  getMovieDetailsService,
  getCastAndCrewService,
  getMovieImagesService,
  getMovieReviewsService,
  getMovieVideosService,
  getSimilarMoviesService,
  getActorMoviesService,
  getRecommendationsService,
  getActorDetailsService,
  getWatchProvidersService,
} from "../services/tmbdService.js";

const trendingMoviesDaily = async (req, res) => {
  try {
    const { data } = await getTrendingDaily();

    if (data) {
      return res.status(200).json({
        message: "Trending Movies fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movies",
      success: false,
    });
  }
};

const trendingMoviesWeekly = async (req, res) => {
  try {
    const { data } = await getTrendingWeekly();

    if (data) {
      return res.status(200).json({
        message: "Trending Movies fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movies",
      success: false,
    });
  }
};

const popularMovies = async (req, res) => {
  try {
    const { data } = await getPopularMovies();

    if (data) {
      return res.status(200).json({
        message: "Popular Movies fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Popular Movies",
      success: false,
    });
  }
};

const topRatedMovies = async (req, res) => {
  try {
    const { data } = await getTopRatedMovies();

    if (data) {
      return res.status(200).json({
        message: "Top Rated Movies fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Top Rated Movies",
      success: false,
    });
  }
};

const upcomingMovies = async (req, res) => {
  try {
    const { data } = await getUpcomingMovies();

    if (data) {
      return res.status(200).json({
        message: "Upcoming Movies fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Upcoming Movies",
      success: false,
    });
  }
};

const nowPlayingMovies = async (req, res) => {
  try {
    const { data } = await getNowPlayingMovies();

    if (data) {
      return res.status(200).json({
        message: "Now-Playing Movies fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Now Playing Movies",
      success: false,
    });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
        success: false,
      });
    }

    const { data } = await searchMoviesService(query);

    if (data && data.results) {
      const filteredMovies = data.results.filter((movie) => {
        return (
          movie.poster_path !== null && 
          movie.backdrop_path !== null && 
          movie.overview && movie.overview.trim().length > 0 &&
          movie.release_date 
        );
      });

      return res.status(200).json({
        message: "Movies fetched Successfully",
        movies: filteredMovies,
        success: true,
      });
    }

    return res.status(404).json({
      message: "No results found",
      movies: [],
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movies",
      success: false,
    });
  }
};

const movieDetails = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getMovieDetailsService(movieId);

    if (data) {
      return res.status(200).json({
        message: "Movie Details fetched Successfully",
        movies: data,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movie Details ",
      success: false,
    });
  }
};

const castAndCrews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getCastAndCrewService(movieId);

    if (data) {
      return res.status(200).json({
        message: "Cast snd Crew Details fetched Successfully",
        movies: data,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movie Cast and Crew Details ",
      success: false,
    });
  }
};

const MovieTrailer = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getMovieVideosService(movieId);

    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({
        message: "No videos found for this movie.",
        success: false,
      });
    }

    const results = data.results;

    const officialTrailer = results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube" && vid.official === true
    );

    const finalTrailer =
      officialTrailer || 
      results.find((vid) => vid.type === "Trailer") || 
      results.find((vid) => vid.type === "Teaser") ||
      results[0]; 

    if (!finalTrailer || !finalTrailer.key) {
      return res.status(404).json({
        message: "No trailer or video key available for this movie.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Movie Trailer fetched Successfully",
      trailer: finalTrailer,
      youtubeUrl: `https://www.youtube.com/watch?v=${finalTrailer.key}`,
      success: true,
    });

  } catch (error) {
    console.error("Trailer Error:", error);
    return res.status(500).json({
      message: "Failed to fetch Movie Trailer.",
      success: false,
    });
  }
};

const similarMovies = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getSimilarMoviesService(movieId);

    const movies = data.results;
    if (!movies || movies.length === 0) {
      return res.status(200).json({
        message: "No similar movie found",
        success: false,
        movies,
      });
    }

    if (data) {
      return res.status(200).json({
        message: "Similar Movie fetched Successfully",
        movies,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Similar Movie.",
      success: false,
    });
  }
};

const RecommendedMovies = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getRecommendationsService(movieId);

    const recommendations = data.results;
    if (!recommendations || recommendations.length === 0) {
      return res.status(200).json({
        message: "No recommended movies found",
        movies: [],
        success: true,
      });
    }

    if (data) {
      return res.status(200).json({
        message: "Recommended Movie fetched Successfully",
        movies: recommendations,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Recommended Movie.",
      success: false,
    });
  }
};

const movieImages = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getMovieImagesService(movieId);

    const images = data.backdrops;
    const finalImages = images.filter(
      (img) => img.iso_3166_1 == null && img.iso_639_1 === null,
    );

    if (data) {
      return res.status(200).json({
        message: "Movie Images fetched Successfully",
        finalImages,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movie images.",
      success: false,
    });
  }
};

const actorDetails = async (req, res) => {
  try {
    const { actorId } = req.params;
    const { data } = await getActorDetailsService(actorId);

    if (data) {
      return res.status(200).json({
        message: "Actor details fetched Successfully",
        data,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Actor details.",
      success: false,
    });
  }
};

const getActorTopMovies = async (req, res) => {
  try {
    const { actorId } = req.params;
    const {data} = await getActorMoviesService(actorId);

    if (data && data.cast) {
      const topMovies = data.cast
        .filter(movie => movie.poster_path && movie.release_date)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5);

      return res.status(200).json({
        success: true,
        movies: topMovies,
      });
    }

    return res.status(404).json({ success: false, message: "No movies found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const watchProviders = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getWatchProvidersService(movieId);

    const indiaProviders = data.results?.IN;

    if (!indiaProviders) {
      return res.status(200).json({
        message: "No watch providers available in India for this movie.",
        providers: null,
        success: true,
      });
    }

    if (data) {
      return res.status(200).json({
        message: "details fetched Successfully",
        providers: indiaProviders,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch details.",
      success: false,
    });
  }
};

const movieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await getMovieReviewsService(movieId);

    return res.status(200).json({
      message: "Movie reviews fetched successfully",
      reviews: data.results,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch movie reviews",
      success: false,
    });
  }
};

export {
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
  movieReviews,
  similarMovies,
  RecommendedMovies,
  movieImages,
  actorDetails,
  getActorTopMovies,
  watchProviders,
};
