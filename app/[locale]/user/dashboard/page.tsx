import { Card } from "@nextui-org/card";
import { useTranslations } from "next-intl";

import ButtonLink from "@/components/button-link";
import { title } from "@/components/primitives";

export default function UserDashboard() {
  const t = useTranslations("user.dashboard");

  return (
    <>
      <div className="flex justify-around w-full">
        <div className="basis-4/5">
          <h1 className={title()}>{t("title")}</h1>
        </div>
        <ButtonLink href="/collection/new" message={t("new")} />
      </div>
      <div className="flex m-6 w-full justify-center">
        <Card className="grid grid-cols-[repeat(4,_1fr)_2fr] gap-6 p-4 w-[90%] text-center overflow-auto">
          Table to show the user collections
        </Card>
      </div>
    </>
  );
}
