// src/app/api/logbook/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Logbook from "@/models/Logbook";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const week = searchParams.get("week");

    const filter = { user: user._id };
    if (week) filter.week = Number(week);

    const data = await Logbook.find(filter).sort({ day: 1 });

    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { day, tanggal, fileUrl, catatan, week } = body;

    if (!day || !tanggal || !fileUrl) {
      return NextResponse.json({ message: "Data wajib belum lengkap" }, { status: 400 });
    }

    const created = await Logbook.create({
      user: user._id,
      day,
      tanggal,
      fileUrl,
      catatan,
      week,
    });

    return NextResponse.json({ message: "Logbook dibuat", data: created }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}
