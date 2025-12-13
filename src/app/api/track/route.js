import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Track from "@/models/Track";
import { requireAdmin } from "@/lib/apiAuth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

/* ================= GET → ambil semua track ================= */
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

    const tracks = await Track.find().sort({ day: -1 });
    return NextResponse.json(tracks, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/track error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ================= POST → tambah track + upload gambar ================= */
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

    const formData = await req.formData();

    const day = Number(formData.get("day"));
    const tanggal = formData.get("tanggal");
    const aktivitas = formData.get("aktivitas");
    const pelajaran = formData.get("pelajaran");
    const kendala = formData.get("kendala") || "";

    if (!day || !tanggal || !aktivitas || !pelajaran) {
      return NextResponse.json(
        {
          message:
            "Hari, tanggal, aktivitas, dan pelajaran wajib diisi",
        },
        { status: 400 }
      );
    }

    /* ===== UPLOAD GAMBAR ===== */
    const files = formData.getAll("images") || [];
    const dokumentasi = [];

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      if (!file || typeof file === "string") continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);
      dokumentasi.push(`/uploads/${filename}`);
    }

    const newTrack = await Track.create({
      day,
      tanggal,
      aktivitas,
      pelajaran,
      kendala,
      dokumentasi,
      user: admin._id,
    });

    return NextResponse.json(
      { message: "Berhasil menyimpan track", data: newTrack },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/admin/track error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
