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
const createAdmin = async () => {
  await connectDB();

  const adminEmail = "admin@example.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("Admin already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10); // hash password

  const admin = new User({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("Admin created successfully!");
  process.exit(0);
};

createAdmin();
