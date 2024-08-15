import { auth } from "@clerk/nextjs/server";

import { getCollection } from "./db/collection";

export const checkAdmin = () => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === "admin";
};

export async function isOwnerOrAdmin(collectionid: string) {
  const { userId } = auth();
  const collection = await getCollection(collectionid);

  if (!collection) return false;

  return userId === collection.userId || checkAdmin();
}
