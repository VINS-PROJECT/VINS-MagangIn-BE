// src/lib/auth.js
import jwt from "jsonwebtoken";
import { headers, cookies } from "next/headers";
import connectDB from "./db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET belum di-set di .env.local");
}

export function signToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function getUserFromRequest() {
  await connectDB();
  let token = null;

  const h = headers();
  const auth = h.get("authorization");

  if (auth && auth.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  } else {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get("token");
    if (cookieToken) token = cookieToken.value;
  }

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("-passwordHash");
    return user;
  } catch {
    return null;
  }
}
