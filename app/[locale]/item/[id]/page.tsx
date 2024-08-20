import { auth } from "@clerk/nextjs/server";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

import { checkAdmin } from "@/utils/roles";
import { getItem } from "@/utils/db/items";
import { Link } from "@/navigation";
import { subtitle, title } from "@/components/primitives";
import DeleteItemButton from "@/components/Item/delete-item-button";
import { HeartFilledIcon } from "@/components/icons";
import ButtonLink from "@/components/button-link";

export default async function ItemPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const item = await getItem(params.id);
  const t = await getTranslations("item.new");

  if (!item) notFound();

  const isOwnerOrAdmin = userId === item.collection.userId || checkAdmin();

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className={title()}>
            <Link href={`/collection/${item.collectionId}`}>
              {t("collectionName")} - {item.collection.name}
            </Link>
          </h1>
        </div>
        <div className={clsx(isOwnerOrAdmin ? "" : "hidden", "flex gap-4")}>
          <ButtonLink href={`/item/${item.id}/edit`} message={t("edit")} />
          <DeleteItemButton
            collectionId={item.collectionId}
            id={item.id}
            message={t("delete")}
          />
        </div>
      </div>

      <Card className="w-full p-6 ">
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <h2 className={title()}>{item.name}</h2>
            <p className="text-small">
              {t("createdOn")}: {item.createdAt.toDateString()}
            </p>
          </div>
          <Button
            color="danger"
            startContent={<HeartFilledIcon />}
            variant="solid"
          >
            123
          </Button>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="basis-1/2">
              <h2 className={subtitle()}>{t("customFieldValues")}</h2>
              <div className="flex flex-col gap-8 w-full">
                {item.customFieldValues.map((customField) => (
                  <div key={customField.id} className="flex flex-col">
                    <p className="font-bold">{customField.customField.name}</p>
                    <p>{customField.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="basis-1/2">
              <h2 className={subtitle()}>{t("tags")}</h2>
              <div className="flex flex-wrap gap-4 justify-around">
                {item.tags.map((tag) => (
                  <Chip key={tag.id} color="primary">
                    {tag.name}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <h2 className="font-bold text-2xl">{t("comments")}</h2>
        </CardFooter>
      </Card>
    </div>
  );
}
