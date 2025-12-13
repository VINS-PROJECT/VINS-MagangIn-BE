import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    time: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Calendar ||
  mongoose.model("Calendar", CalendarSchema);
