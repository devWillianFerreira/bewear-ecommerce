import { getSessionCookie } from "better-auth/cookies";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = await getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/my-orders", "/cart/:path*"],
};
