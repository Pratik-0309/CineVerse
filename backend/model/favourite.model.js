import mongoose, { Schema } from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    voteAverage: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
