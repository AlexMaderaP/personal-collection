import { auth } from "@clerk/nextjs/server";

export const checkAdmin = () => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === "admin";
};
