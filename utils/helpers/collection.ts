import { CollectionForTable } from "@/types/collection";

export const KEYS = [
  "id",
  "name",
  "imageUrl",
  "category",
  "customFields",
  "items",
  "createdAt",
  "actions",
] as const;

export type ColumnKey = (typeof KEYS)[number];

export function generateColumnsFromCollections(
  collections: CollectionForTable[] | undefined,
): { name: string; uid: string }[] {
  if (!collections || collections.length === 0) return [];

  const columns = KEYS.map((key) => ({
    name: convertCamelCaseToSpaces(key),
    uid: key,
  }));

  return columns;
}

const convertCamelCaseToSpaces = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
};
