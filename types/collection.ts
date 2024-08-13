import { Prisma } from "@prisma/client";

export type CollectionWithFieldsCategory = Prisma.CollectionGetPayload<{
  include: {
    customFields: true;
    category: true;
  };
}>;
