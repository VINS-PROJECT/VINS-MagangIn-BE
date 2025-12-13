// src/app/api/admin/track/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Track from "@/models/Track";
import { getUserFromRequest } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ================= GET LIST TRACK ================= */
export async function GET() {
  try {
    await connectDB();
    const tracks = await Track.find().sort({ hari: -1 });
    return NextResponse.json({ data: tracks });
  } catch (err) {
    console.error("GET admin/track error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}

/* ================= CREATE TRACK ================= */
export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const hari = Number(formData.get("hari"));
    const tanggal = formData.get("tanggal");
    const aktivitas = formData.get("aktivitas");
    const pelajaran = formData.get("pelajaran");
    const kendala = formData.get("kendala") || "";

    if (!hari || !tanggal || !aktivitas || !pelajaran) {
      return NextResponse.json(
        { message: "Field wajib belum lengkap" },
        { status: 400 }
      );
    }

    /* Upload gambar */
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

    const track = await Track.create({
      hari,
      tanggal,
      aktivitas,
      pelajaran,
      kendala,
      dokumentasi,
      user: user._id,
    });

    return NextResponse.json(
      { message: "Track berhasil disimpan", data: track },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST admin/track error:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
