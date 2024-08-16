"use server";

import { revalidatePath } from "next/cache";

import {
  editCollectionFormSchema,
  EditCollectionInputs,
  newCollectionFormSchema,
  NewCollectionInputs,
} from "@/types/schemas";
import { db } from "@/utils/db/db";

export async function createNewCollection(dataForm: NewCollectionInputs) {
  try {
    const { data, success } = newCollectionFormSchema.safeParse(dataForm);

    if (success) {
      const newCollection = await db.collection.create({
        data: {
          name: data.name,
          userId: data.userId,
          descripion: data.description,
          imageUrl: data.imageUrl,
          categoryId: data.categoryId,
          customFields: {
            create: data.customFields?.map((customField) => ({
              name: customField.name,
              type: customField.type,
              isRequired: customField.isRequired,
            })),
          },
        },
      });

      revalidatePath("/es/user/dashboard");
      revalidatePath("/en/user/dashboard");

      return newCollection;
    }
  } catch (error) {
    throw new Error(
      "An unexpected error occurred while creating the collection.",
    );
  }
}

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

      revalidatePath(`/collection/${updatedCollection.id}`);
      revalidatePath(`/collection/${updatedCollection.id}/edit`);

      return updatedCollection;
    }
  } catch (error) {
    console.error("Error updating collection:", error);

    return;
  }
}
