"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/navigation";

export default function LangDropdown() {
  const t = useTranslations("home.nav");
  const router = useRouter();
  const pathname = usePathname();
  const locale = t("lang");

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="uppercase w-auto" variant="light">
          {locale}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectedKeys={locale}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(e) => {
          router.replace(pathname, { locale: e.currentKey });
        }}
      >
        <DropdownItem key="en">EN</DropdownItem>
        <DropdownItem key="es">ES</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
