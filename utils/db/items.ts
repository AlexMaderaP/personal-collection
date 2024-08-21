import { db } from "./db";

export async function getItemsFromCollection(collectionId: number) {
  const items = await db.item.findMany({
    where: { collectionId },
    select: {
      id: true,
      collectionId: true,
      name: true,
      _count: {
        select: {
          tags: true,
          customFieldValues: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!items) {
    return [];
  }

  return items.map((item) => {
    const { _count, ...rest } = item;

    return {
      ...rest,
      customFieldsValues: _count.customFieldValues,
      tags: _count.tags,
    };
  });
}

export async function getItem(id: string) {
  const item = await db.item.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      collection: true,
      customFieldValues: {
        include: {
          customField: {
            select: {
              name: true,
            },
          },
        },
      },
      tags: true,
    },
  });

  if (!item) {
    return;
  }

  return item;
}

export async function getItemForEdit(id: string) {
  const item = await db.item.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      collection: {
        select: {
          userId: true,
        },
      },
      customFieldValues: true,
      tags: true,
    },
  });

  if (!item) {
    return;
  }

  return item;
}
