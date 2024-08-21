import { Tag } from "@prisma/client";

import { db } from "./db";

export async function getTags() {
  try {
    const res = await fetch("/api/tags");
    const tags = await res.json();

    return tags as Tag[];
  } catch (error) {
    throw new Error("Could not retrieve tags");
  }
}

export async function createNewTag(tagName: string) {
  try {
    const res = await fetch("/api/tags", {
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

export async function getTagsFromDB(limit?: number) {
  const tags = await db.tag.findMany({
    orderBy: {
      name: "asc",
    },
    take: limit,
  });

  return tags;
}
