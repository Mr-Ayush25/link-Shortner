import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Middleware to hide backend Route
  const { pathname } = request.nextUrl;
  const visitId = pathname.split("/").pop();
  return NextResponse.redirect(new URL(`/api/go/${visitId}`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/go/:path*",
};
