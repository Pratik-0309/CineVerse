import axios from "axios";

const TMBD_URL = "https://api.themoviedb.org/3";

const trendingMoviesDaily = async (req, res) => {
  try {
    const { data } = await axios.get(`${TMBD_URL}/trending/movie/day`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const { data } = await axios.get(`${TMBD_URL}/trending/movie/week`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const { data } = await axios.get(`${TMBD_URL}/movie/popular`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const { data } = await axios.get(`${TMBD_URL}/movie/top_rated`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const { data } = await axios.get(`${TMBD_URL}/movie/upcoming`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const { data } = await axios.get(`${TMBD_URL}/movie/now_playing`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const { query } = req.body;

    if(!query){
      return res.status(400).json({
        message: "Search query is required",
        success: false,
      });
    }

    const { data } = await axios.get(`${TMBD_URL}/search/multi?query=${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
        message: "Movies fetched Successfully",
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

const searchActors = async (req, res) => {
  try {
    const { query } = req.body;

    if(!query){
      return res.status(400).json({
        message: "Search query is required",
        success: false,
      });
    }

    const { data } = await axios.get(`${TMBD_URL}/search/multi?query=${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
        message: "Actors fetched Successfully",
        movies: data.results,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Actors",
      success: false,
    });
  }
};

const movieDetails = async (req, res) => {
  try {
    const {movieId} = req.params;
    const { data } = await axios.get(`${TMBD_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
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
    const {movieId} = req.params;
    const { data } = await axios.get(`${TMBD_URL}/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    if (data) {
      return res.status(201).json({
        message: "Cast snd Crew Details fetched Successfully",
        movies: data,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movie Cast snd Crew Details ",
      success: false,
    });
  }
};

const MovieTrailer = async (req, res) => {
  try {
    const {movieId} = req.params;
    const { data } = await axios.get(`${TMBD_URL}/movie/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    const result = data.results;
    const officialTrailer = result.find(
      (vid) => vid.type === "Trailer" && vid.official === true
    )

    const finalTrailer = officialTrailer || result.find((vid) => vid.type === "Trailer");

    if (data) {
      return res.status(201).json({
        message: "Movie Trailer fetched Successfully",
        trailer: finalTrailer,
        youtubeUrl: `https://www.youtube.com/watch?v=${finalTrailer.key}`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch Movie Trailer.",
      success: false,
    });
  }
};

const similarMovies = async (req, res) => {
  try {
    const {movieId} = req.params;
    const { data } = await axios.get(`${TMBD_URL}/movie/${movieId}/similar`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

    const movies = data.results;
    if(!movies || movies.length === 0){
      return res.status(200).json({
        message: "No similar movie found",
        success: false,
        movies
      })
    }

    if (data) {
      return res.status(201).json({
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
    const {movieId} = req.params;
    const { data } = await axios.get(`${TMBD_URL}/movie/${movieId}/recommendations`, {
      headers: {
        Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
      },
    });

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


export {
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
  RecommendedMovies
};
