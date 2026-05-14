import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames and auth paths
  // Exclude static assets, images, and api routes
  matcher: [
    "/", 
    "/(de|en)/:path*", 
    "/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*).*)"
  ],
};
