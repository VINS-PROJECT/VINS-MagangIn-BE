import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Track from "@/models/Track";
import { getUserFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const tracks = await Track.find().sort({ day: 1 });
  return NextResponse.json(tracks);
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromRequest();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const created = await Track.create(body);

  return NextResponse.json(created, { status: 201 });
}
