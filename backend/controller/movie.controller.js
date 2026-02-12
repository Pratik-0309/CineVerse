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


export {
  trendingMoviesDaily,
  trendingMoviesWeekly,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlayingMovies
};
