import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Track from "@/models/Track";
import { getUserFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  await connectDB();
  const user = await getUserFromRequest();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await Track.findByIdAndUpdate(params.id, body, { new: true });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const user = await getUserFromRequest();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await Track.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Berhasil dihapus" });
}
