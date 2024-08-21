import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { subtitle, title } from "@/components/primitives";
import { CollectionWithItemCount } from "@/types/collection";
import { Link } from "@/navigation";

type CollectionCardProps = {
  collection: CollectionWithItemCount;
  categoryMessage: string;
  itemMessage: string;
};

export default function CollectionCard({
  collection,
  categoryMessage,
  itemMessage,
}: CollectionCardProps) {
  return (
    <Link href={`/collection/${collection.id}`}>
      <Card className="flex md:flex-row gap-6 p-6 w-full my-4">
        <Image
          alt={collection.name}
          className="object-cover basis-1/3"
          fallbackSrc="https://placehold.co/200x200?text=Not+Provided"
          height={200}
          shadow="md"
          src={collection.imageUrl || ""}
          width={200}
        />
        <div className="basis-2/3">
          <h2 className={title()}>{collection.name}</h2>
          <p>{collection.descripion}</p>
          <div className="flex flex-row gap-8">
            <div className="basis-1/2">
              <h3 className={subtitle()}>{categoryMessage}</h3>
              <p>{collection.category.name}</p>
            </div>
            <div className="basis-1/2">
              <h3 className={subtitle()}>{itemMessage}</h3>
              <p>{collection._count.items}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
