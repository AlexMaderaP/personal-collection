import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import React from "react";
import clsx from "clsx";

import { Link } from "@/navigation";

function LinkItem({
  description,
  href,
  closeMenu,
}: {
  description: string;
  href: string;
  closeMenu: () => void;
}) {
  return (
    <NavbarItem onClick={closeMenu}>
      <Link className={clsx(linkStyles({ color: "foreground" }))} href={href}>
        {description}
      </Link>
    </NavbarItem>
  );
}

export default LinkItem;
