import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth as nextAuthMiddleware } from "@/auth";

export default async function middleware(req: NextRequest) {
  // For now, keep NextAuth middleware for backward compatibility
  // In the future, you might want to replace this entirely with backend auth
  return nextAuthMiddleware(req as any);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
