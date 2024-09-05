import { z } from "zod";

export const newCollectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userId: z.string().min(1, "User ID is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  categoryId: z.coerce.number().int().positive("Category is required"),
  customFields: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        type: z.enum(["STRING", "INTEGER", "TEXT", "BOOLEAN", "DATE"]),
        isRequired: z.boolean().default(false),
      }),
    )
    .optional(),
});

export type NewCollectionInputs = z.infer<typeof newCollectionFormSchema>;

export const editCollectionFormSchema = z.object({
  id: z.coerce.number().int().positive("Collection Id is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  categoryId: z.coerce.number().int().positive("Category is required"),
});

export type EditCollectionInputs = z.infer<typeof editCollectionFormSchema>;

export const newCustomFieldFormSchema = z.object({
  collectionId: z.coerce.number().int().positive("Collection Id is required"),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["STRING", "INTEGER", "TEXT", "BOOLEAN", "DATE"]),
  isRequired: z.boolean().default(false),
});

export type NewCustomFieldInputs = z.infer<typeof newCustomFieldFormSchema>;

export const editCustomFieldFormSchema = z.object({
  id: z.coerce.number().int().positive("Custom Field Id is required"),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["STRING", "INTEGER", "TEXT", "BOOLEAN", "DATE"]),
  isRequired: z.boolean().default(false),
});

export type EditCustomFieldInputs = z.infer<typeof editCustomFieldFormSchema>;

export const newItemFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  collectionId: z.coerce.number().int().positive("Collection Id is required"),
  tags: z
    .array(
      z.object({
        id: z.coerce.number().positive("Tag Id is required"),
      }),
    )
    .min(1, "At least one tag is required"),
  customFieldValues: z
    .array(
      z.object({
        customFieldId: z.coerce.number().positive("CustomField Id is required"),
        value: z.coerce.string().optional(),
      }),
    )
    .optional(),
});

export type NewItemInputs = z.infer<typeof newItemFormSchema>;

export const editItemFormSchema = z.object({
  id: z.coerce.number().int().positive("Item Id is required"),
  name: z.string().min(1, "Name is required"),
  collectionId: z.coerce.number().int().positive("Collection Id is required"),
  tags: z
    .array(
      z.object({
        id: z.coerce.number().positive("Tag Id is required"),
      }),
    )
    .min(1, "At least one tag is required"),
  customFieldValues: z
    .array(
      z.object({
        id: z.coerce.number().positive("CustomFieldValue Id is required"),
        customFieldId: z.coerce.number().positive("CustomField Id is required"),
        value: z.coerce.string().optional(),
      }),
    )
    .optional(),
});

export type EditItemInputs = z.infer<typeof editItemFormSchema>;

export const NewsLetterInputs = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
});

export type NewsLetterSchema = z.infer<typeof NewsLetterInputs>;
