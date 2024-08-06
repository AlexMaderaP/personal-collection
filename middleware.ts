import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

import { siteConfig } from "./config/site";

const localeMiddleware = createMiddleware({
  locales: siteConfig.locales,
  defaultLocale: "en",
  localePrefix: "always",
});

const isProtectedRoute = createRouteMatcher(["/user(.*)", "/:locale/user(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  const path = req.nextUrl.pathname;

  if (path.includes("/api")) {
    return;
  }

  return localeMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
