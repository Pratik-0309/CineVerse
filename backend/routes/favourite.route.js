import express from 'express'
import {updateFavourite, getFavourites} from "../controller/favourite.controller.js"
import verifyAuth from "../middleware/auth.middleware.js"

const favouriteRouter = express.Router();

favouriteRouter.use(verifyAuth)

favouriteRouter.get("/", getFavourites);
favouriteRouter.post("/update/:movieId", updateFavourite);

export default favouriteRouter;