"use client";

import { useTranslations } from "next-intl";

import AdminIn from "../admin-in";

import ToggleUserRoleButton from "./toogle-user-role";
import ToogleUserStatusButton from "./toogle-user-status";
import DeleteUserButton from "./delete-user-button";

type UserRowProps = {
  user: {
    id: string;
    fullName: string | null;
    email: string | undefined;
    status: string;
    role: string;
  };
};

export default function UserRow({ user }: UserRowProps) {
  const t = useTranslations("admin.dashboard");

  return (
    <AdminIn>
      <div className="flex items-center justify-center">{user.fullName}</div>
      <div className="flex items-center justify-center">{user.email}</div>
      <div className="flex items-center justify-center">{user.role}</div>
      <div className="flex items-center justify-center">{user.status}</div>
      <div className="flex gap-1 justify-between">
        <ToggleUserRoleButton
          adminMessage={t("makeAdmin")}
          id={user.id}
          role={user.role}
          userMessage={t("makeUser")}
        />
        <ToogleUserStatusButton
          id={user.id}
          status={user.status}
          statusMessage={user.status === "Blocked" ? t("active") : t("blocked")}
        />
        <DeleteUserButton deleteMessage={t("delete")} id={user.id} />
      </div>
    </AdminIn>
  );
}
