"use server";

import { newCollectionFormSchema, NewCollectionInputs } from "@/types/schemas";
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

      return newCollection;
    }
  } catch (error) {
    throw new Error(
      "An unexpected error occurred while creating the collection.",
    );
  }
}
