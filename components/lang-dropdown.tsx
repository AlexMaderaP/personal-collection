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
  const [locale, setLocale] = React.useState(new Set([t("lang")]));

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="uppercase w-auto" isIconOnly>
          {locale}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={locale}
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
