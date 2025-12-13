import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";
import Calendar from "@/models/Calendar";

export const dynamic = "force-dynamic";

/* ===== GET DETAIL ===== */
export async function GET(_req, { params }) {
  try {
    await connectDB();

    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const agenda = await Calendar.findById(params.id);

    if (!agenda) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: agenda });
  } catch (err) {
    console.error("ADMIN CALENDAR DETAIL ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ===== UPDATE ===== */
export async function PUT(req, { params }) {
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

    const updated = await Calendar.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Agenda diupdate",
      data: updated,
    });
  } catch (err) {
    console.error("ADMIN CALENDAR UPDATE ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ===== DELETE ===== */
export async function DELETE(_req, { params }) {
  try {
    await connectDB();

    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const deleted = await Calendar.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Agenda dihapus",
    });
  } catch (err) {
    console.error("ADMIN CALENDAR DELETE ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
