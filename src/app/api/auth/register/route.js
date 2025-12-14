import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User"; // 🔥 WAJIB
import auth from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const exists = await User.findOne({ username: body.username });
    if (exists) {
      return NextResponse.json(
        { message: "Username sudah digunakan" },
        { status: 400 }
      );
    }

    const user = await User.create({
      username: body.username,
      password: body.password,
      role: "admin",
    });

    const token = auth.signToken(user);

    const res = NextResponse.json({
      message: "Register berhasil",
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
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error server" },
      { status: 500 }
    );
  }
}
