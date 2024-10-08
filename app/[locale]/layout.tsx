import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX, enUS } from "@clerk/localizations";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/Navbar/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ClerkProvider
          afterSignOutUrl={`/${locale}`}
          localization={locale === "en" ? enUS : esMX}
        >
          <NextIntlClientProvider messages={messages}>
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <div className="relative flex flex-col h-screen">
                <Navbar />
                <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
                  {children}
                </main>
              </div>
            </Providers>
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
