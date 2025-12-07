// src/models/Logbook.js
import mongoose from "mongoose";

const LogbookSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: { type: Number, required: true },
    tanggal: { type: String, required: true },
    fileUrl: { type: String, required: true }, // link ke PDF (S3 / storage lain)
    catatan: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "revisi"],
      default: "pending",
    },
    week: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Logbook || mongoose.model("Logbook", LogbookSchema);
