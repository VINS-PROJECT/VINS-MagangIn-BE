// src/app/api/auth/me/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}
