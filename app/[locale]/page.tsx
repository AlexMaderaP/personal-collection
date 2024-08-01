import { title, subtitle } from "@/components/primitives";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block  text-center justify-center">
        <h1 className={title()}>{t("create")} </h1>
        <h1 className={title({ color: "violet" })}>{t("custom")}</h1>
        <h1 className={title()}> {t("collection")}</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>{t("display")}</h2>
      </div>
    </section>
  );
}
