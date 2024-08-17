import { db } from "./db";

export async function getCustomFieldsByCollectionId(id: string) {
  const collection = await db.collection.findUnique({
    where: { id: parseInt(id, 10) },
    select: {
      customFields: {
        select: {
          id: true,
          name: true,
          isRequired: true,
          type: true,
        },
      },
    },
  });

  if (!collection) {
    return { customFields: [] };
  }

  return collection;
}
