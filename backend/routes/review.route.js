import express from 'express'
import {addReview, editReview, deleteReview, getMoviesReviews, getUserReviews} from "../controller/review.controller.js"
import verifyAuth from "../middleware/auth.middleware.js"

const reviewRouter = express.Router();

reviewRouter.use(verifyAuth);

reviewRouter.post("/add/:movieId",addReview);
reviewRouter.post("/edit/:reviewId", editReview);
reviewRouter.post("/delete/:reviewId", deleteReview);
reviewRouter.post("/movie/:movieId", getMoviesReviews);
reviewRouter.post("/user", getUserReviews);

export default reviewRouter;