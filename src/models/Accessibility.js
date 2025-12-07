// src/models/Accessibility.js
import mongoose from "mongoose";

const AccessibilitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    textSize: { type: String, default: "normal" }, // normal / medium / large
    highContrast: { type: Boolean, default: false },
    dyslexicFont: { type: Boolean, default: false },
    spacing: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Accessibility ||
  mongoose.model("Accessibility", AccessibilitySchema);
