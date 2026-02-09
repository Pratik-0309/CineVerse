import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());    


app.get("/",(req,res)=> {
    res.send("Hello World");
})

app.listen(process.env.PORT || 8080, (req,res)=> {
    console.log(`Server is listening on port ${process.env.PORT || 8080 }`)
})