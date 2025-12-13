import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import User from "@/models/User";
import connectDB from "@/lib/db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function requireAuth() {
  await connectDB();

  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await User.findById(payload.id).select("-passwordHash");
    return user;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (!user) return null;
  if (user.role !== "admin") return null;
  return user;
}
