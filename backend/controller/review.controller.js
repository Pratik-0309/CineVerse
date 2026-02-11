import Review from "../model/review.model.js";

const addReview = async (req, res) => {
  try {
    const {movieId} = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please log in to share your thoughts on this movie.",
        success: false,
      });
    }

    if (!movieId || !rating || !comment) {
      return res.status(400).json({
        message: "Please provide a rating and a comment to submit your review.",
        success: false,
      });
    }

    const review = await Review.create({
      userId,
      movieId,
      rating,
      comment,
    });

    return res.status(201).json({
      message: "Thanks for the feedback! Your review has been posted.",
      success: true,
      review,
    });
  } catch (error) {
    console.error("Review Error:", error);
    return res.status(500).json({
      message:
        "We're having trouble saving your review right now. Please try again later.",
      success: false,
    });
  }
};

const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?._id;
    if (!reviewId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please provide a rating and a comment to update your review.",
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "We couldn't find the review you're looking for.",
      });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You don't have permission to edit this review.",
        success: false,
      });
    }

    const newReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        $set: { rating, comment },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      message: "Your review has been updated successfully!",
      newReview,
      success: true,
    });
  } catch (error) {
    console.error("Error Editing Review:", error);
    return res.status(500).json({
      message:
        "Something went wrong while saving your changes. Please try again.",
      success: false,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId) {
      return res.status(404).json({
        message: "Review ID is required",
        success: false,
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        message: "We couldn't find the review you're looking for.",
        success: false,
      });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You don't have permission to delete this review.",
        success: false,
      });
    }

    await Review.findByIdAndDelete(reviewId);

    return res.status(200).json({
      message: "Review Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting Review:", error);
    return res.status(500).json({
      message: "Something went wrong while deleting review. Please try again.",
      success: false,
    });
  }
};

const getMoviesReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({
        message: "We couldn't find that movie. Please provide a valid ID.",
        success: false,
      });
    }

    const reviews = await Review.find({ movieId })
      .populate("userId", "userName profilePic")
      .sort({ createdAt: -1 });

    if (reviews.length === 0) {
      return res.status(200).json({
        message: "Be the first to review this movie!",
        success: true,
        reviews: [],
        reviewscount: 0
      });
    }

    return res.status(200).json({
      message: "Reviews loaded successfully.",
      success: true,
      reviews,
      reviewscount: reviews.length,
    });

  } catch (error) {
    console.error("Fetch Movie Reviews Error:", error);
    return res.status(500).json({
      message: "Oops! Something went wrong while fetching reviews. Please try again later.",
      success: false,
    });
  }
};

const getUserReviews = async (req,res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(401).json({
                message: "You need to be logged in to see your reviews.",
                success: false
            })
        }

        const reviews = await Review.find({userId}).sort({createdAt: -1});
        if(reviews.length === 0){
            return res.status(200).json({
                message: "You haven't written any reviews yet.",
                success: false,
                reviews: [],
                totalReviews: 0
            })
        }

        return res.status(200).json({
            message: "Your reviews have been retrieved.",
            success: true,
            reviews,
            totalReviews: reviews.length
        })

    } catch (error) {
        console.error("Fetch User Reviews Error:", error);
        return res.status(500).json({
            message: "We encountered an error retrieving your profile reviews.",
            success: false
        })
    }
}

export { addReview, editReview, deleteReview, getMoviesReviews, getUserReviews };
