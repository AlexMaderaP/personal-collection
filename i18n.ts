import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { siteConfig } from "./config/site";

const locales = siteConfig.locales;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
