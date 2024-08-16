import { Tooltip } from "@nextui-org/tooltip";

import { ColumnKey } from "../../../utils/helpers/collection";

import { CollectionForTable } from "@/types/collection";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import { Link } from "@/navigation";
import DeleteCollectionButton from "@/components/Collection/delete-collection-button";

export const renderCollectionCell = (
  collection: CollectionForTable,
  columnKey: ColumnKey,
) => {
  const cellValue = collection[columnKey as keyof CollectionForTable];

  switch (columnKey) {
    case "imageUrl":
      return collection.imageUrl ? (
        <div className="flex justify-center">
          <Tooltip content="URL">
            <Link
              className="cursor-pointer text-lg text-default-400 active:opacity-50"
              href={collection.imageUrl}
            >
              <EyeIcon />
            </Link>
          </Tooltip>
        </div>
      ) : (
        <>Not provided</>
      );
    case "createdAt":
      return (
        <div className="text-end">
          {new Date(collection.createdAt).toLocaleDateString()}
        </div>
      );
    case "customFields":
      return <div className="text-end">{collection.customFields}</div>;
    case "items":
      return <div className="text-end">{collection.items}</div>;
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-4">
          <Tooltip content="Details">
            <Link
              className="cursor-pointer text-lg text-default-400  active:opacity-50"
              href={`/collection/${collection.id}`}
            >
              <EyeIcon />
            </Link>
          </Tooltip>
          <Tooltip content="Edit">
            <Link
              className="cursor-pointer text-lg text-default-400 active:opacity-50"
              href={`/collection/${collection.id}/edit`}
            >
              <EditIcon />
            </Link>
          </Tooltip>

          <DeleteCollectionButton
            isIcon
            id={collection.id}
            message={<DeleteIcon />}
          />
        </div>
      );
    default:
      return <span>{cellValue as string}</span>;
  }
};
