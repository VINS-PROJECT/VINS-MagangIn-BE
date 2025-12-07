// src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" }, // cuma admin tunggal
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
