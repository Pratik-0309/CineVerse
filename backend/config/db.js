import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}/cineVerse`)
      .then(() => {
        console.log("MongoDB connected Successfully");
      })
      .catch((error) => {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
      });
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
