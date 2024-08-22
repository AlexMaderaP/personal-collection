import { getTranslations } from "next-intl/server";
import { Chip } from "@nextui-org/chip";
import { SignedOut } from "@clerk/nextjs";

import { title } from "@/components/primitives";
import ButtonLink from "@/components/button-link";
import { getTagsFromDB } from "@/utils/db/tags";
import { getRandomColor } from "@/utils/helpers/tag";
import { getLargestCollections } from "@/utils/db/collection";
import CollectionCard from "@/components/Collection/collection-card";
import { getLatestItems } from "@/utils/db/items";
import ItemCard from "@/components/Item/item-card";

export default async function Home() {
  const t = await getTranslations("home");
  const limit = 5;
  const tagLimit = 30;
  const tags = await getTagsFromDB(tagLimit);
  const collections = await getLargestCollections(limit);
  const items = await getLatestItems(limit);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block  text-center justify-center">
          <h1 className={title()}>{t("create")} </h1>
          <h1 className={title({ color: "violet" })}>{t("custom")}</h1>
          <h1 className={title()}> {t("collection")}</h1>
          <div className="mt-4">
            <SignedOut>
              <ButtonLink href="/sign-in" message={t("nav.signIn")} />
            </SignedOut>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 w-full">
        <section className="p-6 ">
          <h2 className={title()}>{t("latestItems")}</h2>
          <ul className="mt-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                collectionMessage={t("collectionMessage")}
                createdMessage={t("createdOn")}
                item={item}
              />
            ))}
          </ul>
        </section>

        <section className="p-6">
          <h2 className={title()}>{t("largestCollections")}</h2>
          <ul className="mt-6">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                categoryMessage={t("categoryMessage")}
                collection={collection}
                itemMessage={t("itemMessage")}
              />
            ))}
          </ul>
        </section>
      </div>

      <section className="my-10 w-full">
        <h2 className={title()}>{t("tagCloud")}</h2>
        <div className="flex flex-wrap gap-4 mt-4 justify-around">
          {tags.map((tag) => (
            <Chip key={tag.id} color={getRandomColor()} size="lg">
              {tag.name}
            </Chip>
          ))}
        </div>
      </section>
    </>
  );
}
