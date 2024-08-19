"use server";

import { revalidatePath } from "next/cache";

import { newItemFormSchema, NewItemInputs } from "@/types/schemas";
import { db } from "@/utils/db/db";

export async function createNewItem(dataForm: NewItemInputs) {
  try {
    const { data, success } = newItemFormSchema.safeParse(dataForm);

    if (success) {
      const tagsIds = data?.tags.map((tag) => tag.id);
      const customFieldValuesData = data.customFieldValues?.map((field) => ({
        customFieldId: field.customFieldId,
        value: field.value,
      }));

      const newItem = await db.item.create({
        data: {
          name: data.name,
          collectionId: data.collectionId,
          tags: {
            connect: tagsIds.map((id) => ({ id })),
          },
        },
      });

      if (customFieldValuesData) {
        await db.customFieldValue.createMany({
          data: customFieldValuesData.map((field) => ({
            itemId: newItem.id,
            customFieldId: field.customFieldId,
            value: field.value,
          })),
        });
      }

      revalidatePath("/es/user/dashboard");
      revalidatePath("/en/user/dashboard");
      revalidatePath(`/es/collection/${newItem.collectionId}`);
      revalidatePath(`/en/collection/${newItem.collectionId}`);

      return newItem;
    }
  } catch (error) {
    throw new Error("An unexpected error occurred while creating the Item.");
  }
}
