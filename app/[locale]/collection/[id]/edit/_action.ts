"use server";

import {
  editCollectionFormSchema,
  EditCollectionInputs,
} from "@/types/schemas";
import { db } from "@/utils/db/db";

export async function updateCollection(dataForm: EditCollectionInputs) {
  try {
    const { data, success } = editCollectionFormSchema.safeParse(dataForm);

    if (success) {
      const updatedCollection = await db.collection.update({
        where: { id: data.id },
        data: {
          name: data.name,
          descripion: data.description,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId,
        },
      });

      return updatedCollection;
    }
  } catch (error) {
    console.error("Error updating collection:", error);
    return;
  }
}
