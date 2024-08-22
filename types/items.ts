import { Prisma } from "@prisma/client";

export type ItemForTable = {
  customFieldsValues: number;
  tags: number;
  name: string;
  id: number;
  createdAt: Date;
  collectionId: number;
  updatedAt: Date;
};

export type ItemForEditableForm = Prisma.ItemGetPayload<{
  include: {
    collection: {
      select: {
        userId: true;
      };
    };
    tags: true;
    customFieldValues: true;
  };
}>;

export type ItemWithDetails = Prisma.ItemGetPayload<{
  include: {
    customFieldValues: {
      include: {
        customField: true;
      };
    };
    tags: true;
    collection: true;
  };
}>;
