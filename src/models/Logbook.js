import mongoose from "mongoose";

const LogbookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    week: {
      type: Number, // Minggu ke-1, ke-2, dst
      required: true,
    },

    startDate: String,
    endDate: String,

    ringkasan: { type: String, required: true },
    pembelajaran: { type: String, required: true },
    kendala: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Logbook ||
  mongoose.model("Logbook", LogbookSchema);
