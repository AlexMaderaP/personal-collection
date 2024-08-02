"use client";

import { Divider } from "@nextui-org/divider";
import { useEffect } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { subtitle } from "@/components/primitives";

export default function Error({ error }: { error: Error }) {
  const t = useTranslations("error");

  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 text-center">
      <h1 className={subtitle()}>{t("message")}</h1>
      <Divider className="max-w-80" orientation="horizontal" />
      <Link
        className={buttonStyles({
          color: "default",
          radius: "full",
          variant: "shadow",
        })}
        href="/"
      >
        {t("home")}
      </Link>
    </div>
  );
}
