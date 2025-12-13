import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAuth } from "@/lib/apiAuth";
import Calendar from "@/models/Calendar";

export const dynamic = "force-dynamic";

/* ================= GET DETAIL AGENDA ================= */
export async function GET(_req, { params }) {
  try {
    await connectDB();

    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const agenda = await Calendar.findOne({
      _id: params.id,
      user: user._id,
    });

    if (!agenda) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: agenda });
  } catch (err) {
    console.error("GET calendar error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ================= UPDATE AGENDA ================= */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const updated = await Calendar.findOneAndUpdate(
      { _id: params.id, user: user._id },
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
    console.error("PUT calendar error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ================= DELETE AGENDA ================= */
export async function DELETE(_req, { params }) {
  try {
    await connectDB();

    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const deleted = await Calendar.findOneAndDelete({
      _id: params.id,
      user: user._id,
    });

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
    console.error("DELETE calendar error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
