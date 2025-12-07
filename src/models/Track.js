import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    tanggal: { type: String, required: true },
    judul: { type: String, required: true },
    catatan: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Track || mongoose.model("Track", TrackSchema);
