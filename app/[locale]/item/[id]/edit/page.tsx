import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

import { title } from "@/components/primitives";
import { checkAdmin } from "@/utils/roles";
import { getItemForEdit } from "@/utils/db/items";
import EditItemForm from "@/components/Item/edit-item-form";
import { getCustomFieldsByCollectionId } from "@/utils/db/customFields";
import LoadingSpinner from "@/components/loading";

export default async function EditItem({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const item = await getItemForEdit(params.id);
  const t = await getTranslations("item.new");

  if (!item) notFound();
  const isOwnerOrAdmin = userId === item.collection.userId || checkAdmin();

  if (!isOwnerOrAdmin) auth().redirectToSignIn();

  const collection = await getCustomFieldsByCollectionId(
    item.collectionId.toString(),
  );

  return (
    <>
      <h1 className={title()}>{t("editItem")}</h1>
      <div className="m-4 w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <EditItemForm customFields={collection.customFields} item={item} />
        </Suspense>
      </div>
    </>
  );
}
