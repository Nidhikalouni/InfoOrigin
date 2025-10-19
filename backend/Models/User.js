import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
},{ timestamps: true });

// If a User model already exists, use it. Otherwise, create a new one.
export const User = mongoose.models.User || mongoose.model("User", userSchema);
