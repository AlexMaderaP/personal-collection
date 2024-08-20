import { Tooltip } from "@nextui-org/tooltip";
import clsx from "clsx";

import DeleteItemButton from "../delete-item-button";

import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import { Link } from "@/navigation";
import { ItemForTable } from "@/types/items";
import { ItemKey } from "@/utils/helpers/items";

export const renderItemCell = (
  item: ItemForTable,
  itemKey: ItemKey,
  isOwnerOrAdmin: boolean,
) => {
  const cellValue = item[itemKey as keyof ItemForTable];

  switch (itemKey) {
    case "createdAt":
      return (
        <div className="text-end">
          {new Date(item.createdAt).toLocaleDateString()}
        </div>
      );
    case "tags":
    case "customFieldsValues":
      return <div className="text-end">{cellValue as number}</div>;
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-4">
          <Tooltip content="Details">
            <Link
              className="cursor-pointer text-lg text-default-400  active:opacity-50"
              href={`/item/${item.id}`}
            >
              <EyeIcon />
            </Link>
          </Tooltip>

          <Tooltip content="Edit">
            <Link
              className={clsx(
                isOwnerOrAdmin ? "" : "hidden",
                "cursor-pointer text-lg text-default-400 active:opacity-50",
              )}
              href={`/item/${item.id}/edit`}
            >
              <EditIcon />
            </Link>
          </Tooltip>
          <div className={clsx(isOwnerOrAdmin ? "" : "hidden")}>
            <DeleteItemButton
              isIcon
              collectionId={item.collectionId}
              id={item.id}
              message={<DeleteIcon />}
            />
          </div>
        </div>
      );
    default:
      return <span>{cellValue as string}</span>;
  }
};
