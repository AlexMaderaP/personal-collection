import { Tag } from "@prisma/client";

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
      customFieldValues: true,
      tags: true,
    },
  });

  if (!item) {
    return;
  }

  return item;
}

export async function getTags() {
  try {
    const res = await fetch("/api/items");
    const tags = await res.json();

    return tags as Tag[];
  } catch (error) {
    throw new Error("Could not retrieve tags");
  }
}

export async function createNewTag(tagName: string) {
  try {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tagName }),
    });

    if (!res.ok) {
      throw new Error("Failed to create tag");
    }
    const newTag = await res.json();

    return newTag as Tag;
  } catch (error) {
    throw new Error("Could not create tag");
  }
}
