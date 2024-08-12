import { db } from "@/utils/db/db";

export async function getCollection(id: string) {
  const collection = await db.collection.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      customFields: true,
      category: true,
      items: true,
    },
  });

  if (!collection) {
    return;
  }

  return collection;
}
