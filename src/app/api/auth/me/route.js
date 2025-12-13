import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { requireAuth } from "@/lib/apiAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("AUTH ME ERROR:", err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
