import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  if (!token && path.startsWith("/homepages")) {
    return NextResponse.redirect(new URL("/homepages/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/homepages/:path*"],
};