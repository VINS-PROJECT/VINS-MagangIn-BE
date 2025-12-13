import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Track from "@/models/Track";
import Logbook from "@/models/Logbook";

export async function GET() {
  await connectDB();
  const user = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ show: false });
  }

  const totalTrack = await Track.countDocuments({ user: user._id });

  if (totalTrack < 7) {
    return NextResponse.json({ show: false });
  }

  const currentWeek = Math.floor((totalTrack - 1) / 7) + 1;

  const exists = await Logbook.findOne({
    user: user._id,
    week: currentWeek,
  });

  if (exists) {
    return NextResponse.json({ show: false });
  }

  const tracks = await Track.find({ user: user._id })
    .sort({ hari: 1 })
    .skip((currentWeek - 1) * 7)
    .limit(7);

  return NextResponse.json({
    show: true,
    week: currentWeek,
    startDate: tracks[0].tanggal,
    endDate: tracks[6].tanggal,
  });
}
