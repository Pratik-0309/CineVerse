import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movieId: {
        type: String,
        required: true,
        index: true
    },
    rating: {
        type: Number,
        min:1,
        max:5,
        required: true
    },
    comment:{
        type: String,
        required: true,
    }
},{timestamps: true})

const Review = mongoose.model("Review", reviewSchema);

export default Review;