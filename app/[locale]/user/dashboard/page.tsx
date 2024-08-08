import ButtonLink from "@/components/button-link";
import { title } from "@/components/primitives";
import { Card } from "@nextui-org/card";
import { getTranslations } from "next-intl/server";

export default async function UserDashboard() {
  const t = await getTranslations("user.dashboard");
  return (
    <>
      <div className="flex justify-around w-full">
        <div className="basis-4/5">
          <h1 className={title()}>{t("title")}</h1>
        </div>
        <ButtonLink message={t("new")} href="/collection/new" />
      </div>
      <div className="flex m-6 w-full justify-center">
        <Card className="grid grid-cols-[repeat(4,_1fr)_2fr] gap-6 p-4 w-[90%] text-center overflow-auto">
          Table to show the user collections
        </Card>
      </div>
    </>
  );
}
