import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { siteConfig } from "./config/site";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: siteConfig.locales });
