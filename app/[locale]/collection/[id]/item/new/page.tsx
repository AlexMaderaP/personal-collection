import { getTranslations } from "next-intl/server";
import React from "react";

import NewItemForm from "@/components/Item/new-item-form";
import { title } from "@/components/primitives";
import { redirect } from "@/navigation";
import { getCustomFieldsByCollectionId } from "@/utils/db/customFields";
import { isOwnerOrAdmin } from "@/utils/roles";

export default async function NewItem({ params }: { params: { id: string } }) {
  const t = await getTranslations("item.new");
  const collectionId = params.id;
  const isAbleToAdd = await isOwnerOrAdmin(collectionId);

  if (!isAbleToAdd) redirect(`/collection/${collectionId}`);

  const collection = await getCustomFieldsByCollectionId(collectionId);

  return (
    <>
      <div>
        <h1 className={title()}>
          {t("title")} - {collection.name}
        </h1>
      </div>
      <div className="m-4 w-full">
        <NewItemForm
          collectionId={collectionId}
          customFields={collection?.customFields}
        />
      </div>
    </>
  );
}
