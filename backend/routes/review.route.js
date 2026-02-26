import express from "express";
import {
  addReview,
  editReview,
  deleteReview,
  getMoviesReviews,
  getUserReviews,
} from "../controller/review.controller.js";
import verifyAuth from "../middleware/auth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.get("/movie/:movieId", getMoviesReviews);


reviewRouter.post("/add/:movieId", verifyAuth, addReview);
reviewRouter.put("/edit/:reviewId", verifyAuth, editReview);
reviewRouter.delete("/delete/:reviewId", verifyAuth, deleteReview);
reviewRouter.get("/user", verifyAuth, getUserReviews);

export default reviewRouter;