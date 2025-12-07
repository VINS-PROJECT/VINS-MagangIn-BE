// src/app/api/track/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Track from "@/models/Track";

export const dynamic = "force-dynamic";

// GET /api/track?tanggal=2025-10-01
export async function GET(req) {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const tanggal = searchParams.get("tanggal");

    const filter = { user: user._id };
    if (tanggal) filter.tanggal = tanggal;

    const data = await Track.find(filter).sort({ day: 1 });

    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}

// POST /api/track
export async function POST(req) {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { day, tanggal, aktivitas, pelajaran, kendala } = body;

    if (!day || !tanggal || !aktivitas) {
      return NextResponse.json({ message: "Data wajib belum lengkap" }, { status: 400 });
    }

    const created = await Track.create({
      user: user._id,
      day,
      tanggal,
      aktivitas,
      pelajaran,
      kendala,
    });

    return NextResponse.json({ message: "Track dibuat", data: created }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}
