// src/app/api/accessibility/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import Accessibility from "@/models/Accessibility";

export const dynamic = "force-dynamic";

// GET /api/accessibility
export async function GET() {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const doc = await Accessibility.findOne({ user: user._id });

    return NextResponse.json({
      data:
        doc || {
          textSize: "normal",
          highContrast: false,
          dyslexicFont: false,
          spacing: false,
        },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}

// POST / PUT / PATCH sama2 lewat POST (simple)
export async function POST(req) {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { textSize, highContrast, dyslexicFont, spacing } = body;

    const updated = await Accessibility.findOneAndUpdate(
      { user: user._id },
      { textSize, highContrast, dyslexicFont, spacing },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: "Disimpan", data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}
