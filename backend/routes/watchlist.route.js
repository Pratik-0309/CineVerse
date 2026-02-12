import express from 'express'
import {updateWatchlist, getUserWatchlist} from "../controller/watchlist.controller.js"
import verifyAuth from "../middleware/auth.middleware.js"

const watchlistRouter = express.Router();

watchlistRouter.use(verifyAuth);

watchlistRouter.get("/", getUserWatchlist);
watchlistRouter.post("/update/:movieId", updateWatchlist);

export default watchlistRouter;