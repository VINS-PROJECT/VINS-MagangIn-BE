import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Track from "@/models/Track";
import Logbook from "@/models/Logbook";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const totalTrack = await Track.countDocuments();
    const totalLogbook = await Logbook.countDocuments();

    return NextResponse.json({
      day: totalTrack, // asumsi 1 track = 1 hari
      totalTrack,
      totalDocs: 0, // nanti diganti jika ada model Dokumen
      totalLogbook,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal memuat statistik" },
      { status: 500 }
    );
  }
}
