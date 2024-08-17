import { auth } from "@clerk/nextjs/server";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { checkAdmin } from "@/utils/roles";
import { getCollection } from "@/utils/db/collection";
import { subtitle, title } from "@/components/primitives";
import ButtonLink from "@/components/button-link";
import DeleteCollectionButton from "@/components/Collection/delete-collection-button";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  const collection = await getCollection(params.id);
  const t = await getTranslations("collection.new");

  if (!collection) notFound();

  const isOwnerOrAdmin = userId === collection.userId || checkAdmin();

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className={title()}>{collection.name}</h1>
        </div>
        <div className={clsx(isOwnerOrAdmin ? "" : "hidden", "flex gap-4")}>
          <ButtonLink
            href={`/collection/${collection.id}/edit`}
            message={t("edit")}
          />
          <DeleteCollectionButton id={collection.id} message={t("delete")} />
        </div>
      </div>

      <Card className="flex md:flex-row gap-6 p-6">
        <Image
          alt="Collection Image"
          className="object-cover basis-1/3"
          fallbackSrc="https://placehold.co/400x300?text=Not+Provided"
          height={300}
          shadow="md"
          src={collection.imageUrl || ""}
          width={400}
        />
        <div className="basis-2/3">
          <h2 className={subtitle()}>{t("description")}</h2>
          <p>{collection.descripion}</p>
          <div className="flex flex-row gap-8 ">
            <div className="basis-1/2">
              <h2 className={subtitle()}>{t("category")}</h2>
              <p>{collection.category.name}</p>
            </div>
            <div className="basis-1/2">
              <h2 className={subtitle()}>{t("createdAt")}</h2>
              <p>{collection.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
          <h2 className={subtitle()}>{t("customField")}</h2>
          <div className="flex flex-wrap gap-8">
            {collection.customFields.map((customField) => (
              <div key={customField.id}>
                <div>
                  <p>
                    {t("name")}: {customField.name}
                  </p>
                  <p>
                    {t("type")}: {customField.type.toLowerCase()}
                  </p>
                  {customField.isRequired ? <p>{t("required")}</p> : <></>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className={title()}>Items</h1>
        </div>
        <div className={clsx(isOwnerOrAdmin ? "" : "hidden", "flex gap-4")}>
          <ButtonLink
            href={`/collection/${collection.id}/item/new`}
            message={t("addItem")}
          />
        </div>
      </div>
    </div>
  );
}
