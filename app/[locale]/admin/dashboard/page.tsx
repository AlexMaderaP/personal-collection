import { clerkClient } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { Card } from "@nextui-org/card";

import { redirect } from "@/navigation";
import { checkAdmin } from "@/utils/roles";
import { title } from "@/components/primitives";
import UserRow from "@/components/Admin/user-row";
import { getUserDisplayData } from "@/utils/userHelpers";

const columns = ["name", "email", "role", "status", "actions"] as const;

export default async function AdminDashboard() {
  if (!checkAdmin()) {
    redirect("/");
  }
  const t = await getTranslations("admin.dashboard");

  const users = (await clerkClient().users.getUserList({ limit: 500 })).data;

  const userData = getUserDisplayData(users);

  return (
    <>
      <h1 className={title()}>{t("title")} </h1>
      <div className="flex m-6 w-full justify-center">
        <Card className="grid grid-cols-[repeat(4,_1fr)_2fr] gap-6 p-4 w-[90%] text-center overflow-auto">
          {columns.map((column, idx) => (
            <div key={idx} className="font-bold">
              {t(column)}
            </div>
          ))}
          {userData.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </Card>
      </div>
    </>
  );
}
