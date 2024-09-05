import { getTranslations } from "next-intl/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import ButtonLink from "@/components/button-link";
import { title } from "@/components/primitives";
import { getCollections } from "@/utils/db/collection";
import CollectionTable from "@/components/Collection/Table/collection-table";
import NewsletterModal from "@/components/SalesforceIntegration/NewsLetterModal";

export default async function UserDashboard() {
  const t = await getTranslations("user.dashboard");

  const { userId } = auth();

  const collections = await getCollections(userId!);
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const phone = user?.phoneNumbers[0]?.phoneNumber || "";

  return (
    <>
      <div className="flex justify-around w-full gap-4">
        <div className="basis-4/5">
          <h1 className={title()}>{t("title")}</h1>
        </div>
        <NewsletterModal
          email={email}
          firstName={user?.firstName || ""}
          lastName={user?.lastName || ""}
          phone={phone}
        />
        <ButtonLink href="/collection/new" message={t("new")} />
      </div>
      <div className="flex m-6 w-full justify-center">
        <CollectionTable collections={collections} />
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
