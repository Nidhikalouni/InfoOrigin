
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); 
  }
};