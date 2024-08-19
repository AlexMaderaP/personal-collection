import { Tag } from "@prisma/client";

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
