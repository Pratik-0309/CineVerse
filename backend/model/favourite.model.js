import mongoose, {Schema} from "mongoose";

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
  },
  { timestamps: true },
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
