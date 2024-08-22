import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";

import { HeartFilledIcon } from "../icons";

import { title, subtitle } from "@/components/primitives";
import { ItemWithDetails } from "@/types/items";
import { Link } from "@/navigation";

type ItemCardProps = {
  item: ItemWithDetails;
  createdMessage: string;
  collectionMessage: string;
};

export default function ItemCard({
  item,
  createdMessage,
  collectionMessage,
}: ItemCardProps) {
  return (
    <Card className="w-full p-6 my-4">
      <Link href={`/item/${item.id}`}>
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <h2 className={title()}>{item.name}</h2>
            <p className="text-small">
              {createdMessage}: {item.createdAt.toDateString()}
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
      </Link>

      <CardBody>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="basis-1/2">
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
            <Link href={`/collection/${item.collectionId}`}>
              <p className="font-bold">{collectionMessage}: </p>
              <p>{item.collection.name}</p>
            </Link>

            <h2 className={subtitle()}>Tags</h2>
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
    </Card>
  );
}
