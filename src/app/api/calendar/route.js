import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Calendar from "@/models/Calendar";

export const dynamic = "force-dynamic";

/* ===== PUBLIC GET ===== */
export async function GET() {
  try {
    await connectDB();

    const data = await Calendar.find(
      {},
      {
        title: 1,
        date: 1,
        time: 1,
        location: 1,
      }
    ).sort({ date: 1 });

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PUBLIC CALENDAR ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
