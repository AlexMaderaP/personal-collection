import React, { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

export default function AdminIn({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const hasAdminRole = user?.publicMetadata?.role === "admin";

  if (!hasAdminRole) {
    return null;
  }

  return <>{children}</>;
}
