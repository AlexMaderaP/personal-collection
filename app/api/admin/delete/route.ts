import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkAdmin } from "@/utils/roles";
import { checkRequireSignOut } from "@/utils/api/signOutUtils";

export async function POST(req: Request) {
  if (!checkAdmin()) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const { id } = await req.json();
    const { userId } = auth();

    if (!id) {
      return new NextResponse("Missing Id in body", { status: 400 });
    }

    await clerkClient().users.deleteUser(id);

    const requiresSignOut = checkRequireSignOut(userId, id);

    return new NextResponse(
      JSON.stringify({ message: `User Deleted`, requiresSignOut }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse("Error deleting user", { status: 500 });
  }
}
