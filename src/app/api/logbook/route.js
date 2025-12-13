import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import auth from "@/lib/auth";
import Logbook from "@/models/Logbook";

export async function POST(req) {
  await connectDB();

  const user = await auth.getUserFromRequest();
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const exist = await Logbook.findOne({
    user: user._id,
    week: body.week,
  });

  if (exist) {
    return NextResponse.json(
      { message: "Logbook minggu ini sudah dibuat" },
      { status: 400 }
    );
  }

  const logbook = await Logbook.create({
    ...body,
    user: user._id,
  });

  return NextResponse.json({
    message: "Logbook berhasil dibuat",
    data: logbook,
  });
}
