// src/models/Track.js
import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  hari: Number,
  tanggal: String,
  aktivitas: String,
  pelajaran: String,
  kendala: String,
  dokumentasi: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.models.Track || mongoose.model("Track", TrackSchema);
