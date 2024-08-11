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
