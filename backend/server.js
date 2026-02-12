import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import reviewRouter from './routes/review.route.js';
import watchlistRouter from "./routes/watchlist.route.js"
import favouriteRouter from './routes/favourite.route.js';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());  

connectDB();

app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/favourite",favouriteRouter);

app.get("/",(req,res)=> {
    res.send("Hello World");
})

app.listen(process.env.PORT || 8080, (req,res)=> {
    console.log(`Server is listening on port ${process.env.PORT || 8080 }`)
})