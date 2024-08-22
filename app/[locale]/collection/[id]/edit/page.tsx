import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

import { title } from "@/components/primitives";
import { getCollection } from "@/utils/db/collection";
import { checkAdmin } from "@/utils/roles";
import EditCollectionForm from "@/components/Collection/edit-collection-form";
import LoadingSpinner from "@/components/loading";

export default async function EditCollection({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  const collection = await getCollection(params.id);
  const t = await getTranslations("collection.edit");

  if (!collection) notFound();
  const isOwnerOrAdmin = userId === collection.userId || checkAdmin();

  if (!isOwnerOrAdmin) auth().redirectToSignIn();

  return (
    <>
      <h1 className={title()}>{t("title")}</h1>
      <div className="m-4 w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <EditCollectionForm collection={collection} />
        </Suspense>
      </div>
    </>
  );
}
