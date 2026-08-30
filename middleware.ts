import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/students") || path.startsWith("/students/login")) return NextResponse.next();
  const token = process.env.NEXT_STUDENTS_ADMIN_TOKEN;
  if (token && req.cookies.get("next_students_admin")?.value === token) return NextResponse.next();
  return NextResponse.redirect(new URL("/students/login", req.url));
}

export const config = { matcher: ["/students/:path*"] };
