import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAuth } from "@/lib/apiAuth";
import Track from "@/models/Track";

export const dynamic = "force-dynamic";

/* ================= GET DETAIL TRACK ================= */
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

    const track = await Track.findOne({
      _id: params.id,
      user: user._id,
    });

    if (!track) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: track });
  } catch (err) {
    console.error("GET /api/track/[id] error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ================= UPDATE TRACK ================= */
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

    const updated = await Track.findOneAndUpdate(
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
      message: "Track diupdate",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /api/track/[id] error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ================= DELETE TRACK ================= */
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

    const deleted = await Track.findOneAndDelete({
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
      message: "Track dihapus",
    });
  } catch (err) {
    console.error("DELETE /api/track/[id] error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
