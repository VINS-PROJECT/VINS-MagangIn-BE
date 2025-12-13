import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAdmin } from "@/lib/apiAuth";
import Track from "@/models/Track";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= GET DETAIL TRACK ================= */
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

    const track = await Track.findById(params.id);

    if (!track) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: track });
  } catch (err) {
    console.error("GET admin/track/:id error:", err);
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

    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const updated = await Track.findByIdAndUpdate(
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
      message: "Track diupdate",
      data: updated,
    });
  } catch (err) {
    console.error("PUT admin/track/:id error:", err);
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

    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const track = await Track.findById(params.id);

    if (!track) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    /* 🔥 HAPUS FILE DOKUMENTASI (JIKA ADA) */
    if (Array.isArray(track.dokumentasi)) {
      for (const fileUrl of track.dokumentasi) {
        try {
          const filePath = path.join(
            process.cwd(),
            "public",
            fileUrl.replace("/", "")
          );
          await fs.unlink(filePath);
        } catch {
          // file boleh tidak ada
        }
      }
    }

    await Track.deleteOne({ _id: track._id });

    return NextResponse.json({
      message: "Track berhasil dihapus",
    });
  } catch (err) {
    console.error("DELETE admin/track/:id error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
