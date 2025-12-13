import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import User from "@/models/User";
import connectDB from "./db";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
  signToken(user) {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    return jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
  },

  async getUserFromRequest() {
    await connectDB();

    const h = headers();
    const cookieStore = cookies();

    let token = h.get("authorization")?.split(" ")[1];
    if (!token) token = cookieStore.get("token")?.value;
    if (!token) return null;

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      return await User.findById(payload.id).select("-passwordHash");
    } catch {
      return null;
    }
  },
};

export default auth;
