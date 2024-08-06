"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useTranslations } from "next-intl";
import { SignedIn } from "@clerk/nextjs";
import { useState } from "react";

import AdminIn from "../admin-in";

import LangDropdown from "./lang-dropdown";
import InitSession from "./init-session";
import LinkItem from "./link-item";

import { Link as LocaleLink } from "@/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/Navbar/theme-switch";
import { GithubIcon, SearchIcon } from "@/components/icons";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("home.nav");

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder={t("search")}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      className="border-b-small"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <LocaleLink
            className="flex justify-start items-center gap-1"
            href="/"
          >
            <p className="font-bold text-default-900">{t("title")}</p>
          </LocaleLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          <LinkItem
            closeMenu={() => setIsMenuOpen(false)}
            description={t("home")}
            href="/"
          />
          <SignedIn>
            <LinkItem
              closeMenu={() => setIsMenuOpen(false)}
              description={t("userDashboard")}
              href="/user/dashboard"
            />
            <AdminIn>
              <LinkItem
                closeMenu={() => setIsMenuOpen(false)}
                description={t("adminDashboard")}
                href="/admin/dashboard"
              />
            </AdminIn>
          </SignedIn>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <LangDropdown />
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <InitSession signInMessage={t("signIn")} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <LangDropdown />
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarItem className="md:hidden">
          <InitSession signInMessage={t("signIn")} />
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <ul>
            <LinkItem
              closeMenu={() => setIsMenuOpen(false)}
              description={t("home")}
              href="/"
            />
            <SignedIn>
              <LinkItem
                closeMenu={() => setIsMenuOpen(false)}
                description={t("userDashboard")}
                href="/user/dashboard"
              />
              <AdminIn>
                <LinkItem
                  closeMenu={() => setIsMenuOpen(false)}
                  description={t("adminDashboard")}
                  href="/admin/dashboard"
                />
              </AdminIn>
            </SignedIn>
          </ul>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
