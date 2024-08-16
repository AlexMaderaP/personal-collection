import { User } from "@clerk/nextjs/dist/types/server";

type userData = {
  id: string;
  fullName: string | null;
  email: string | undefined;
  role: string;
  status: string;
};

export function getUserDisplayData(users: User[]): userData[] {
  const userData = users.map((user) => {
    const id = user.id;
    const fullName = user.fullName;
    const email = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId,
    )?.emailAddress;
    const role = (user.publicMetadata.role as string) || "user";
    const status = user.banned ? "Blocked" : "Active";

    return { id, fullName, email, role, status };
  });

  return userData.sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;

    const nameA = a.fullName ?? "";
    const nameB = b.fullName ?? "";

    return nameA.localeCompare(nameB);
  });
}
