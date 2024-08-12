import ButtonLink from "@/components/button-link";
import DeleteButton from "@/components/Collection/delete-button";
import { subtitle, title } from "@/components/primitives";
import { getCollection } from "@/utils/db/collection";
import { checkAdmin } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className={title()}>{collection.name}</h1>
          </div>
          <div className={clsx(isOwnerOrAdmin ? "" : "hidden", "flex gap-4")}>
            <ButtonLink
              message={t("edit")}
              href={`/collection/${collection.id}/edit`}
            />
            <DeleteButton id={collection.id.toString()} message={t("delete")} />
          </div>
        </div>
        <p className="self-end mr-4">
          {t("createdAt")}: {collection.createdAt.toLocaleDateString()}
        </p>
      </CardHeader>
      <CardBody className="flex md:flex-row gap-6">
        <Image
          alt="Collection Image"
          className="object-cover basis-1/3"
          height={300}
          width={400}
          shadow="md"
          fallbackSrc="https://placehold.co/400x300?text=Not+Found"
          src={collection.imageUrl || ""}
        />
        <div className="basis-2/3">
          <h2 className={subtitle()}>{t("description")}</h2>
          <p>{collection.descripion}</p>
          <h2 className={subtitle()}>{t("category")}</h2>
          <p>{collection.category.name}</p>
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
      </CardBody>
    </Card>
  );
}
