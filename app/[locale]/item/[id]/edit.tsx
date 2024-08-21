import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { title } from "@/components/primitives";
import { checkAdmin } from "@/utils/roles";
import { getItem } from "@/utils/db/items";
import EditItemForm from "@/components/Item/edit-item-form";
import { getCustomFieldsByCollectionId } from "@/utils/db/customFields";

export default async function EditItem({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const item = await getItem(params.id);
  const t = await getTranslations("item.new");

  if (!item) notFound();
  const isOwnerOrAdmin = userId === item.collection.userId || checkAdmin();

  if (!isOwnerOrAdmin) auth().redirectToSignIn();

  const collection = await getCustomFieldsByCollectionId(
    item.collectionId.toString()
  );

  return (
    <>
      <h1 className={title()}>{t("title")}</h1>
      <div className="m-4 w-full">
        <EditItemForm item={item} customFields={collection.customFields} />
      </div>
    </>
  );
}
