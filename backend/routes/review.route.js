import express from 'express'
import {addReview, editReview, deleteReview, getMoviesReviews, getUserReviews} from "../controller/review.controller.js"
import verifyAuth from "../middleware/auth.middleware.js"

const reviewRouter = express.Router();

reviewRouter.use(verifyAuth);

reviewRouter.post("/add/:movieId",addReview);
reviewRouter.put("/edit/:reviewId", editReview);
reviewRouter.delete("/delete/:reviewId", deleteReview);
reviewRouter.get("/movie/:movieId", getMoviesReviews);
reviewRouter.get("/user", getUserReviews);

export default reviewRouter;