// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "Mark90r123 ";

async function ensureAdminExists() {
  await connectDB();
  const existing = await User.findOne({ username: DEFAULT_ADMIN_USERNAME });
  if (!existing) {
    const hash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
    await User.create({
      username: DEFAULT_ADMIN_USERNAME,
      passwordHash: hash,
      role: "admin",
    });
    console.log("Admin default dibuat:", DEFAULT_ADMIN_USERNAME);
  }
}

export async function POST(req) {
  try {
    await ensureAdminExists();
    const body = await req.json();
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
        { message: "Username atau password salah" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { message: "Username atau password salah" },
        { status: 401 }
      );
    }

    const token = signToken(user);

    const res = NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user._id,
        username: user.username,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error server" }, { status: 500 });
  }
}
