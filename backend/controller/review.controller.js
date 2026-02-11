import Review from "../model/review.model.js";

const addReview = async(req,res) => {
    try {
        const {movieId, rating, comment} = req.body;
        const userId = req.user._id;

        if(!userId){
            return res.status(402).json({
                message: "Please log in to share your thoughts on this movie.",
                success: false
            })
        }

        if(!movieId || !rating || !comment){
            return res.status(402).json({
                message: "Please provide a rating and a comment to submit your review.",
                success: false
            })
        }

        const review = await Review.create({
            userId,
            movieId,
            rating,
            comment
        })

        return res.status(200).json({
            message: "Thanks for the feedback! Your review has been posted.",
            success: true,
            review
        })

    } catch (error) {
        console.error("Review Error:", error);
        return res.status(500).json({
            message: "We're having trouble saving your review right now. Please try again later.",
            success: false
        })
    }
}

const editReview = async(req,res) => {
    try {
        const {reviewId, rating, comment} = req.body;
        const userId = req.user?._id;
        if(!reviewId || !rating || !comment){
            return res.status(402).json({
                success: false,
                message: "Please provide a rating and a comment to update your review."
            })
        }

        const review = await Review.findById(reviewId);
        if(!review){
            return res.status(402).json({
                success: false,
                message: "We couldn't find the review you're looking for."
            })
        }

        if(review.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "You don't have permission to edit this review.",
                success: false
            })
        }

        const newReview = await Review.findByIdAndUpdate(reviewId, 
            {
                $set: {rating ,comment}
            }, {
            new: true,
            runValidators: true,
        })

        return res.status(200).json({
            message: "Your review has been updated successfully!",
            newReview,
            success: true
        })

    } catch (error) {
        console.error("Error Editing Review:", error);
        return res.status(500).json({
            message: "Something went wrong while saving your changes. Please try again.",
            success: false
        })
    }
}

const deleteReview = async (req,res) => {
    try {
        const {reviewId} = req.body;
        if(!reviewId){
            return res.status(404).json({
                message: "Review ID is required",
                success: false,
            })
        }

        const review = await Review.findById(reviewId);
        if(!review){
            return res.status(404).json({
                message: "We couldn't find the review you're looking for.",
                success: false
            })
        }

        if(review.userId.toString() !== req.user._id.toString()){
             return res.status(403).json({
                message: "You don't have permission to delete this review.",
                success: false
            })
        }

        await Review.findByIdAndDelete(reviewId);

        return res.status(200).json({
            message: "Review Deleted Successfully",
            success: true
        })
    } catch (error) {
       console.error("Error deleting Review:", error);
        return res.status(500).json({
            message: "Something went wrong while deleting review. Please try again.",
            success: false
        }) 
    }
}

export {addReview, editReview, deleteReview};