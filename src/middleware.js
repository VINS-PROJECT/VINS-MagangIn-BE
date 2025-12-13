import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* ================= CONFIG ================= */
const PUBLIC_PATHS = ["/login"];
const PUBLIC_API = ["/api/calendar"]; // calendar public (GET)

/* ================= MIDDLEWARE ================= */
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Halaman public
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ API public (read-only calendar)
  if (PUBLIC_API.includes(pathname)) {
    return NextResponse.next();
  }

  // 3️⃣ Admin pages & admin APIs
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // 🔐 OPTIONAL: cek role admin
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.log("Token invalid:", err.message);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 4️⃣ Default → allow
  return NextResponse.next();
}

/* ================= MATCHER ================= */
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/calendar",
  ],
};
