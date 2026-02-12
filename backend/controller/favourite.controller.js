import Favourite from "../model/favourite.model.js";

const updateFavourite = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, poster_path, release_date, vote_average } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please log in to manage your favourites.",
        success: false,
      });
    }

    const favourite = await Favourite.findOne({ userId, movieId });
    if (favourite) {
      await Favourite.findByIdAndDelete(favourite._id);
      return res.status(200).json({
        message: `Removed "${favourite.title}" from your favourite.`,
        success: true,
        added: false,
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Movie details are missing. Could not add to favourites.",
        success: false,
      });
    }

    const newFavourite = await Favourite.create({
      userId,
      movieId,
      title,
      posterPath: poster_path,
      releaseDate: release_date,
      voteAverage: vote_average,
    });

    return res.status(201).json({
      message: `Added "${title}" to your favourites!`,
      success: true,
      added: true,
      data: newFavourite,
    });
  } catch (error) {
    console.error("Favourite Error:", error);
    return res.status(500).json({
      message: "We couldn't update your Favourite right now. Please try again.",
      success: false,
    });
  }
};

const getFavourites = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        message: "Logged in to get watchlist.",
        success: false,
      });
    }

    const favourites = await Favourite.find({userId}).sort({createdAt: -1})

    if(favourites.length === 0){
        return res.status(200).json({
        message: "Your favourites is currently empty. Start adding some movies!",
        success: true,
        favourites: [],
        totalfavourite: 0,
      });
    }

    return res.status(200).json({
      message: "We've retrieved your favourites.",
      success: true,
      favourites,
      totalfavourites: favourites.length,
    });

  } catch (error) {
     console.log("Fetch favourites Error:", error);
    return res.status(500).json({
      message: "Failed to fetch favourites",
      success: false,
    });
  }
};

export { updateFavourite, getFavourites };
