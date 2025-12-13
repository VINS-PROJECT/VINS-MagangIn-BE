import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";
import Calendar from "@/models/Calendar";

export const dynamic = "force-dynamic";

/* ===== ADMIN GET ===== */
export async function GET() {
  try {
    await connectDB();

    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await Calendar.find({}).sort({ date: 1 });
    return NextResponse.json({ data });
  } catch (err) {
    console.error("ADMIN CALENDAR GET ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ===== ADMIN POST ===== */
export async function POST(req) {
  try {
    await connectDB();

    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.title || !body.date) {
      return NextResponse.json(
        { message: "Judul & tanggal wajib diisi" },
        { status: 400 }
      );
    }

    const created = await Calendar.create({
      user: admin._id,
      title: body.title,
      date: body.date,
      time: body.time || "",
      location: body.location || "",
    });

    return NextResponse.json(
      { message: "Agenda berhasil ditambahkan", data: created },
      { status: 201 }
    );
  } catch (err) {
    console.error("ADMIN CALENDAR POST ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
