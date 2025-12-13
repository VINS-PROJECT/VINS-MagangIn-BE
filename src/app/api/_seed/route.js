// src/app/api/_seed/route.js
import seedAdmin from "@/lib/seedAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  await seedAdmin();
  return NextResponse.json({ message: "Admin seeded" });
}
