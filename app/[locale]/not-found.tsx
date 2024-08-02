import { button as buttonStyles } from "@nextui-org/theme";
import { Divider } from "@nextui-org/divider";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { title } from "@/components/primitives";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex gap-3">
        <h1 className={title({ color: "yellow" })}>404</h1>
        <Divider orientation="vertical" />
        <h1 className={title()}>{t("title")}</h1>
      </div>
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
