import { Prisma } from "@prisma/client";

export type CollectionWithFieldsCategory = Prisma.CollectionGetPayload<{
  include: {
    customFields: true;
    category: true;
  };
}>;

export type CustomFieldsForForm = Prisma.CustomFieldGetPayload<{
  select: {
    id: true;
    name: true;
    isRequired: true;
    type: true;
  };
}>;

export type CollectionForTable = {
  id: number;
  name: string;
  category: string;
  imageUrl: string | null;
  customFields: number;
  items: number;
  createdAt: Date;
};
