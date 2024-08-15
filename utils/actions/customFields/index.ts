"use server";

import {
  editCustomFieldFormSchema,
  EditCustomFieldInputs,
  newCustomFieldFormSchema,
  NewCustomFieldInputs,
} from "@/types/schemas";
import { db } from "@/utils/db/db";

export async function editCustomField(dataForm: EditCustomFieldInputs) {
  try {
    const { data, success } = editCustomFieldFormSchema.safeParse(dataForm);

    if (success) {
      const updatedCustomField = await db.customField.update({
        where: { id: data.id },
        data: {
          name: data.name,
          type: data.type,
          isRequired: data.isRequired,
        },
      });

      return updatedCustomField;
    }
  } catch (error) {
    console.error("Error updating collection:", error);

    return;
  }
}

export async function createCustomField(dataForm: NewCustomFieldInputs) {
  try {
    const { data, success } = newCustomFieldFormSchema.safeParse(dataForm);

    if (success) {
      const newCustomField = await db.customField.create({
        data: {
          collectionId: data.collectionId,
          name: data.name,
          type: data.type,
          isRequired: data.isRequired,
        },
      });

      return newCustomField;
    }
  } catch (error) {
    console.error("Error updating collection:", error);

    return;
  }
}
