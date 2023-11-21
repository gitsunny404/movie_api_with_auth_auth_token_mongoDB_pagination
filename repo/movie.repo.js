import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.CONNECT_MONGO_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB for movie repo is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
