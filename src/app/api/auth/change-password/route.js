import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import User from "@/models/User";

export async function POST(req) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { message: "Password lama dan baru wajib diisi" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password baru minimal 8 karakter" },
        { status: 400 }
      );
    }

    // Ambil user fresh (dengan passwordHash)
    const freshUser = await User.findById(user._id);

    const isMatch = await freshUser.comparePassword(oldPassword);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password lama salah" },
        { status: 401 }
      );
    }

    // Set password baru (akan di-hash oleh pre-save)
    freshUser.passwordHash = newPassword;
    await freshUser.save();

    return NextResponse.json({
      message: "Password berhasil diubah",
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
