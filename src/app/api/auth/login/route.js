import connectDB from "@/lib/db";
import User from "@/models/User";
import auth from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { message: "Body request tidak valid" },
        { status: 400 }
      );
    }

    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    const token = auth.signToken(user);

    const res = NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
