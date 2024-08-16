import { db } from "@/utils/db/db";

export async function getCollections(userId: string) {
  const collections = await db.collection.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      category: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          customFields: true,
          items: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!collections) {
    return [];
  }

  return collections.map((collection) => {
    const { _count, category, ...rest } = collection;

    return {
      ...rest,
      customFields: _count.customFields,
      items: _count.items,
      category: category.name,
    };
  });
}

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
