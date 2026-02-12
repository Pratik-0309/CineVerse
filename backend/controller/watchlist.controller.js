import Watchlist from "../model/watchlist.model.js";

const updateWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, poster_path, release_date, vote_average } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        message: "Please log in to manage your watchlist.",
        success: false,
      });
    }

    const watchlist = await Watchlist.findOne({ userId, movieId });
    if (watchlist) {
      await Watchlist.findByIdAndDelete(watchlist._id);
      return res.status(200).json({
        message: `Removed "${watchlist.title}" from your watchlist.`,
        success: true,
        added: false,
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Movie details are missing. Could not add to watchlist.",
        success: false,
      });
    }

    const newwatchlist = await Watchlist.create({
      userId,
      movieId,
      title,
      posterPath: poster_path,
      releaseDate: release_date,
      voteAverage: vote_average
    });

    return res.status(201).json({
      message: `Added "${title}" to your watchlist!`,
      success: true,
      added: true,
      data: newwatchlist
    });

  } catch (error) {
    console.error("Watchlist Error:", error);
    return res.status(500).json({
      message: "We couldn't update your watchlist right now. Please try again.",
      success: false,
    });
  }
};

const getUserWatchlist = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        message: "Logged in to get watchlist.",
        success: false,
      });
    }

    const watchlists = await Watchlist.find({ userId: userId }).sort({
      createdAt: -1,
    });

    if (watchlists.length === 0) {
      return res.status(200).json({
        message: "Your watchlist is currently empty. Start adding some movies!",
        success: true,
        watchlists: [],
        totalWatchlist: 0,
      });
    }

    return res.status(200).json({
      message: "We've retrieved your watchlist.",
      success: true,
      watchlists,
      totalWatchlist: watchlists.length,
    });
  } catch (error) {
    console.log("Fetch Watchlist Error:", error);
    return res.status(500).json({
      message: "Failed to fetch watchlist",
      success: false,
    });
  }
};

export { updateWatchlist, getUserWatchlist };
