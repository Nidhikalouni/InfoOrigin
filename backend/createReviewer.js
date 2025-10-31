import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./Models/User.js"; // Adjust path if needed

dotenv.config(); // Load environment variables

// 1. Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

// 2. Create admin user
const createReviewer = async () => {
  await connectDB();

  const reviewerEmail = "reviewer@example.com";
  const existingReviewer= await User.findOne({ email: reviewerEmail });

  if (existingReviewer) {
    console.log("Reviewer already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("reviewer123", 10); // hash password

  const reviewer = new User({
    name: "Super Reviewer",
    email: reviewerEmail,
    password: hashedPassword,
    role: "reviewer"
  });

  await reviewer.save();
  console.log("Reviewer created successfully!");
  process.exit(0);
};

createReviewer();
