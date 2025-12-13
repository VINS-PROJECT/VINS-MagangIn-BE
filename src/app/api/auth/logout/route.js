import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    message: "Logout berhasil",
  });

  // 🔥 Hapus cookie token
  res.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // ⬅️ penting
    path: "/",
  });

  return res;
}
