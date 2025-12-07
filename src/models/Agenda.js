// src/models/Agenda.js
import mongoose from "mongoose";

const AgendaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    type: { type: String, default: "general" }, // Meeting / Logbook / Deadline dll
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String }, // "18:00"
    location: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Agenda || mongoose.model("Agenda", AgendaSchema);
