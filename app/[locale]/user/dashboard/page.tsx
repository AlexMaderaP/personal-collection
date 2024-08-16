import { getTranslations } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";

import ButtonLink from "@/components/button-link";
import { title } from "@/components/primitives";
import { getCollections } from "@/utils/db/collection";
import CollectionTable from "@/components/Collection/Table/collection-table";

export default async function UserDashboard() {
  const t = await getTranslations("user.dashboard");

  const { userId } = auth();

  const collections = await getCollections(userId!);

  return (
    <>
      <div className="flex justify-around w-full">
        <div className="basis-4/5">
          <h1 className={title()}>{t("title")}</h1>
        </div>
        <ButtonLink href="/collection/new" message={t("new")} />
      </div>
      <div className="flex m-6 w-full justify-center">
        <CollectionTable collections={collections} />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
