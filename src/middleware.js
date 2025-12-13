import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login"];
const PUBLIC_API = ["/api/calendar"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Public pages
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ Public API
  if (PUBLIC_API.includes(pathname)) {
    return NextResponse.next();
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminPage || isAdminApi) {
    const token = req.cookies.get("token")?.value;

    // ❌ No token
    if (!token) {
      return isAdminApi
        ? NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          )
        : NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // 🔐 Role check
      if (payload.role !== "admin") {
        return isAdminApi
          ? NextResponse.json(
              { message: "Forbidden" },
              { status: 403 }
            )
          : NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.log("Token invalid:", err.message);

      return isAdminApi
        ? NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
          )
        : NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/calendar"],
};
