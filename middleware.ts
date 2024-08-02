import createMiddleware from "next-intl/middleware";

import { siteConfig } from "./config/site";

export default createMiddleware({
  locales: siteConfig.locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(es|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
