export const KEYS = [
  "id",
  "name",
  "tags",
  "customFieldsValues",
  "createdAt",
  "actions",
] as const;

export type ItemKey = (typeof KEYS)[number];
